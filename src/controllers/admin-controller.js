import { db } from "../models/db.js";

export const adminController = {
  
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("adminlogin-view", { title: "Admin Login to Megalithic Ireland" });
    },
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      console.log(`Email and password: ${  email  }${password}`)
      const user = await db.adminStore.getAdminUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
      
    },
  },
};