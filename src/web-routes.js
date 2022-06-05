import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { monumentController } from "./controllers/monument-controller.js";
import { adminDashboardController } from "./controllers/adminDashboard-controller.js";
import { userSettingsController } from "./controllers/user-settings-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "GET", path: "/adminDashboard", config: adminDashboardController.index },
    { method: "GET", path: "/adminDashboard/deleteuser/{id}", config: adminDashboardController.deleteUser },
    { method: "GET", path: "/adminsettings", config: userSettingsController.index },
    { method: "POST", path: "/adminsettings/editAdminUser", config: userSettingsController.editAdminUser },
  
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addplacename", config: dashboardController.addPlace },
    { method: "GET", path: "/dashboard/deleteplace/{id}", config: dashboardController.deletePlace },

    { method: "GET", path: "/place/{id}", config: monumentController.index },
    { method: "POST", path: "/place/{id}/addmonument", config: monumentController.addMonument },
    { method: "GET", path: "/place/{id}/deletemonument/{monumentid}", config: monumentController.deleteMonument },
    { method: "POST", path: "/place/{id}/editmonument", config: monumentController.updateMonument },
    { method: "GET", path: "/place/{id}/updatemonument/{monumentid}", config: monumentController.updateIndex },
    { method: "POST", path: "/place/{id}/uploadimage/{monumentid}", config: monumentController.uploadMonumentImage },
    
    

    { method: "GET", path: "/settings", config: userSettingsController.index },
    { method: "GET", path: "/settings/deleteuser/{id}", config: userSettingsController.deleteUser },
    { method: "POST", path: "/settings/edituser", config: userSettingsController.editUser },

    { method: "POST", path: "/place/{id}/uploadimage", config: monumentController.uploadImage },
    { method: "DELETE", path: "/place/{id}/deleteimage", config: monumentController.deleteImage },

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

  ];