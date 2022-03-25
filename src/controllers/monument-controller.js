import { db } from "../models/db.js";
import { MonumentSpec } from "../models/joi-schemas.js";

export const monumentController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      console.log("Monuments:", "Place: ", place)
      const viewData = {
        title: "Place",
        place: place,
      };
      return h.view("monument-view", viewData);
    },
  },

  addMonument: {
    validate: {
      // payload: MonumentSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const place = await db.placeStore.getPlaceById(request.params.id)
        return h.view("monument-view", { title: "Add Monument error", place: place, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newMonument = {
        name: request.payload.name,
        description: request.payload.description,
        location:
        {
          lat: request.payload.lat,
          lng: request.payload.lng,
        },
        cat: request.payload.cat,
      };
      await db.monumentStore.addMonument(place._id, newMonument);
      return h.redirect(`/place/${place._id}`);
    },
  },

  deleteMonument: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      await db.monumentStore.deleteMonumentById(request.params.monumentid);
      return h.redirect(`/place/${place._id}`);
    },
  },
};