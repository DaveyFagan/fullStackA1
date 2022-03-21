import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { monumentController } from "./controllers/monument-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "POST", path: "/adminauthenticate", config: adminController.login },
    { method: "GET", path: "/adminlogin", config: adminController.showLogin },
    // { method: "GET", path: "/admindashboard", config: admindashboardController.index },
  
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addplacename", config: dashboardController.addPlace },
    { method: "GET", path: "/dashboard/deleteplace/{id}", config: dashboardController.deletePlace },

    { method: "GET", path: "/place/{id}", config: monumentController.index },
    { method: "POST", path: "/place/{id}/addmonument", config: monumentController.addMonument },

  ];