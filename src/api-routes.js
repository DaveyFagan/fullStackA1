import { megalithicApi } from "./api/megalithic-api.js";
import { placeApi } from "./api/place-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne},

  { method: "POST", path: "/api/megalithicmonuments", config: megalithicApi.create },
  { method: "GET", path: "/api/megalithicmonuments", config: megalithicApi.find },
  { method: "GET", path: "/api/megalithicmonuments/{id}", config: megalithicApi.findOne},
  { method: "DELETE", path: "/api/megalithicmonuments", config: megalithicApi.deleteAll},
  { method: "DELETE", path: "/api/megalithicmonuments/{id}", config: megalithicApi.deleteOne},

  { method: "POST", path: "/api/places", config: placeApi.create },
  { method: "GET", path: "/api/places", config: placeApi.find },
];