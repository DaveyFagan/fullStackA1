import { monumentApi } from "./api/monument-api.js";
import { placeApi } from "./api/place-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne},

  { method: "POST", path: "/api/monuments", config: monumentApi.create },
  { method: "GET", path: "/api/monuments", config: monumentApi.find },
  { method: "GET", path: "/api/monuments/{id}", config: monumentApi.findOne},
  { method: "DELETE", path: "/api/monuments", config: monumentApi.deleteAll},
  { method: "DELETE", path: "/api/monuments/{id}", config: monumentApi.deleteOne},

  { method: "POST", path: "/api/places", config: placeApi.create },
  { method: "GET", path: "/api/places", config: placeApi.find },
];