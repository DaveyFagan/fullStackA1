import { db } from "../models/db.js";

export const userSettingsController = {
  index: {
    handler: async function (request, h) {
       const loggedInUser = request.auth.credentials;
     // const users = await db.userStore.getAllUsers();
     // console.log("Print users: ", users)
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        user: loggedInUser
      };
      if (loggedInUser.email === process.env.admin_email){
        return h.view("admin-settings", viewData)
      }
      return h.view("user-settings", viewData);
    },
  },

  editUser: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      console.log("print getuser", user);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      console.log("New user is: ", newUser);
      await db.userStore.updateUser(user, newUser);
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