import Boom from "@hapi/boom";
import { db } from "../models/db.js";

// import { IdSpec, MonumentSpec, MonumentSpecPlus, MonumentArraySpec } from "../models/joi-schemas.js";
// import { validationError } from "./logger.js";

export const monumentApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const monument = await db.monumentStore.addMonument(request.params.id, request.payload);
        if (monument) {
          return h.response(monument).code(201);
        }
        return Boom.badImplementation("error creating monument");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const monuments = await db.monumentStore.getAllMonuments();
        return monuments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    /*
    tags: ["api"],
    response: { schema: MonumentArraySpec, failAction: validationError },
    description: "Get all monumentApi",
    notes: "Returns all monumentApi",
    */
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const monument = await db.monumentStore.getMonumentById(request.params.id);
        if (!monument) {
          return Boom.notFound("No Monument with this id");
        }
        return monument;
      } catch (err) {
        return Boom.serverUnavailable("No Monument with this id");
      }
    },
  },

// fix later: When random id is used, the last monument is deleted.****

deleteOne: {
  auth: false,
  handler: async function (request, h) {
    try {
      const monument = await db.monumentStore.getMonumentById(request.params.id);
      if (!monument) {
        return Boom.notFound("No monument with this id");
      }
      console.log("Monument is :", monument)
      await db.monumentStore.deleteMonumentById(monument._id);
      return h.response().code(204);
    } catch (err) {
      return Boom.serverUnavailable("No monument with this id");
    }
  },
},

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.monumentStore.deleteAllMonuments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  
};