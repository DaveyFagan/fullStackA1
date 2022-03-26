import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlaceArraySpec, PlaceSpec, PlaceSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const placeApi = {
    // user id not added
    create: {
      auth: false,
      handler: async function (request, h) {
        try {
          const place = request.payload;
          const newPlace = await db.placeStore.addPlace(place);
          if (newPlace) {
            return h.response(newPlace).code(201);
          }
          return Boom.badImplementation("error creating place");
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      tags: ["api"],
      description: "Create a Place",
      notes: "Returns the newly created Place",
      validate: { payload: PlaceSpec, failAction: validationError },
      response: { schema: PlaceSpecPlus, failAction: validationError },
    },

  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaceArraySpec, failAction: validationError },
    description: "Get all places",
    notes: "Returns all places",
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Find a Place",
    notes: "Returns a Place",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

// fix later: When random id is used, the last monument is deleted.****

deleteOne: {
  auth: false,
  handler: async function (request, h) {
    try {
      const place = await db.placeStore.getPlaceById(request.params.id);
      if (!place) {
        return Boom.notFound("No Place with this id");
      }
      await db.placeStore.deletePlaceById(place._id);
      return h.response().code(204);
    } catch (err) {
      return Boom.serverUnavailable("No Place with this id");
    }
  },
    tags: ["api"],
    description: "Delete a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
},

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PlaylistApi",
  },
  
};