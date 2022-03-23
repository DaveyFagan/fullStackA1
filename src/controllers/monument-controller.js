import { db } from "../models/db.js";

export const monumentController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      // const place = await db.placeStore.getPlaylistById(request.params.id);
      // const monuments = await db.monumentStore.getMonumentsByPlaceId(place._id);
      console.log("Monuments:", "Place: ", place)
      const viewData = {
        title: "Place",
        place: place,
        // monuments: monuments
      };
      return h.view("monument-view", viewData);
    },
  },

  addMonument: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newMonument = {
        name: request.payload.name,
        description: request.payload.description,
        lat: request.payload.lat,
        lng: request.payload.lng
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