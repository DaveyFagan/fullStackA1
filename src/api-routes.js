import { megalithicApi } from "./api/megalithic-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/megalithicmonuments", config: megalithicApi.create },
  { method: "GET", path: "/api/megalithicmonuments", config: megalithicApi.find }
];