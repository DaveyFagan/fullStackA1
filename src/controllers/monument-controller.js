import { db } from "../models/db.js";

export const monumentController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
     // const megalithicMonuments = await db.megalithicStore.getUserMegMonuments(loggedInUser._id);
      const viewData = {
        title: "Place",
        place: place
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
      const getMonument = await db.monumentStore.getMonumentById(request.params.id);
      await db.monumentStore.deleteMonumentById(getMonument._id);
      return h.redirect("/dashboard");
    },
  },
};