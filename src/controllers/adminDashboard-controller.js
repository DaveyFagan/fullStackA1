import { db } from "../models/db.js";

export const adminDashboardController = {
  index: {
    handler: async function (request, h) {
      // const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      console.log("Print users: ", users)
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        users: users,
        
      };
      return h.view("adminDashboard-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const getUser = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(getUser._id);
      const allUsers = await db.userStore.getAllUsers();
      viewData = {
          title: "Megalithic Ireland Dashboard",
          users: allUsers
      };
      return h.view("admindDashboard-view", viewData);
    },
  },

};