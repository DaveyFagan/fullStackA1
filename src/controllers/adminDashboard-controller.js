import { db } from "../models/db.js";

export const adminDashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      // eslint-disable-next-line no-var
      var removeAdmin = users.filter(data => data.email !== process.env.admin_email);
      console.log("without admin: ", removeAdmin)
      const noOfUsers = removeAdmin.length;
      console.log("how many users are there?", noOfUsers)
      console.log("Print users: ", users)
      const viewData = {
        title: "Megalithic Ireland Dashboard",
        user: loggedInUser,
        users: removeAdmin,
        noOfUsers: noOfUsers
      };
      return h.view("adminDashboard-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const getUser = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(getUser._id);
      return h.redirect("/adminDashboard");
    },
  },

};