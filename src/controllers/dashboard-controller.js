import { db } from "../models/db.js";
import { PlaceSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const currentUser = await db.placeStore.getUserPlaces(loggedInUser._id)
        return h.view("dashboard-view", { title: "Add Place error", places: currentUser, errors: error.details }).takeover().code(400);
      },
    },
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