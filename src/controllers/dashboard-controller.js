import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const places = await db.placeStore.getUserPlaces(loggedInUser._id);
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        user: loggedInUser,
        places: places,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlace: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlace = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.placeStore.addPlace(newPlace);
      return h.redirect("/dashboard");
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const getPlace = await db.placeStore.getPlaceById(request.params.id);
      await db.placeStore.deletePlaceById(getPlace._id);
      return h.redirect("/dashboard");
    },
  },
};