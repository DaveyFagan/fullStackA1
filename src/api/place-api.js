import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
  },
  
};