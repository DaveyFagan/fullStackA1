import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const megalithicApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const megalithicMonument = await db.megalithicStore.addMegalithicMonument(request.payload);
        if (megalithicMonument) {
          return h.response(megalithicMonument).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const megalithicMonuments = await db.megalithicStore.getAllMegalithicMonuments();
        return megalithicMonuments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const megalithicMonument = await db.megalithicStore.getMegalithicMonumentById(request.params.id);
        if (!megalithicMonument) {
          return Boom.notFound("No Monument with this id");
        }
        return megalithicMonument;
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
              await db.megalithicStore.deleteMegalithicMonumentById(request.params.id);
              const megalithicMonuments = await db.megalithicStore.getAllMegalithicMonuments();

              return megalithicMonuments;
          }catch (err) {
              return Boom.serverUnavailable("No Monument with this id")
          }
      }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.megalithicStore.deleteAllMegalithicMonuments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  
};