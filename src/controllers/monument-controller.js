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

  addMegalithicMonument: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newMegalithicMonument = {
        name: request.payload.name,
        description: request.payload.description,
        lat: request.payload.lat,
        lng: request.payload.lng
      };
      await db.megalithicStore.addMonument(place._id, newMegalithicMonument);
      return h.redirect(`/place/${place._id}`);
    },
  },

  deleteMegalithicMonument: {
    handler: async function (request, h) {
      const getMegMonument = await db.megalithicStore.getMegalithicMonumentById(request.params.id);
      await db.megalithicStore.deleteMegalithicMonumentById(getMegMonument._id);
      return h.redirect("/dashboard");
    },
  },
};