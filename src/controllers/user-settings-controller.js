import { db } from "../models/db.js";

export const userSettingsController = {
  index: {
    handler: async function (request, h) {
       const loggedInUser = request.auth.credentials;
     // const users = await db.userStore.getAllUsers();
   //   console.log("Print users: ", users)
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        user: loggedInUser
      };
      return h.view("user-settings", viewData);
    },
  },

  editUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      console.log("print getuser", loggedInUser);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      console.log("New user is: ", newUser);
      await db.userStore.updateUser(loggedInUser, newUser);
      return h.redirect("/");
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const getUser = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(getUser._id);
      return h.redirect("/");
    },
  },

};