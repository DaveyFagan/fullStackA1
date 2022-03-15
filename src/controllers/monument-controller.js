import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const megalithicMonuments = await db.megalithicStore.getUserMegMonuments(loggedInUser._id);
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        user: loggedInUser,
        megalithicMonuments: megalithicMonuments,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addMegalithicMonument: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newMegalithicMonument = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description,
        lat: request.payload.lat,
        lng: request.payload.lng
      };
      await db.megalithicStore.addMegalithicMonument(newMegalithicMonument);
      return h.redirect("/dashboard");
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