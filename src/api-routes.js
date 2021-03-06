import { monumentApi } from "./api/monument-api.js";
import { placeApi } from "./api/place-api.js";
import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne},

  { method: "POST", path: "/api/places/{id}/monuments", config: monumentApi.create },
  { method: "GET", path: "/api/monuments", config: monumentApi.find },
  { method: "GET", path: "/api/monuments/{id}", config: monumentApi.findOne},
  { method: "DELETE", path: "/api/monuments", config: monumentApi.deleteAll},
  { method: "DELETE", path: "/api/monuments/{id}", config: monumentApi.deleteOne},
  { method: "POST", path: "/api/monuments/{id}/uploadimage", config: monumentApi.createImage },

  { method: "POST", path: "/api/places", config: placeApi.create },
  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne},
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll},
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne},

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/category", config: categoryApi.find },
  { method: "GET", path: "/api/category/{id}", config: categoryApi.findOne },
  { method: "POST", path: "/api/category", config: categoryApi.create },
  { method: "DELETE", path: "/api/category/{id}", config: categoryApi.deleteOne },
  { method: "DELETE", path: "/api/category", config: categoryApi.deleteAll},

];