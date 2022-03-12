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
      };
      await db.megalithicStore.addMegalithicMonument(newMegalithicMonument);
      return h.redirect("/dashboard");
    },
  },
};