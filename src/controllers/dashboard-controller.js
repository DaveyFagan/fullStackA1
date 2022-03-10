import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const megalithicMonuments = await db.megalithicStore.getAllMegalithicMonuments();
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        megalithicMonuments: megalithicMonuments,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addMegalithicMonument: {
    handler: async function (request, h) {
      const newMegalithicMonument = {
        name: request.payload.title,
      };
      await db.megalithicStore.addMegalithicMonument(newMegalithicMonument);
      return h.redirect("/dashboard");
    },
  },
};