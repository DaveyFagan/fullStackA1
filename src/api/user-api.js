import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { db } from "../models/db.js";
import { UserCredentialsSpec, UserArray, UserSpec, UserSpecPlus, IdSpec, JwtAuth  } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

const saltRounds = 10;

export const userApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = request.payload;
        
        user.password = await bcrypt.hash(user.password,saltRounds);
        const saltedUser = await db.userStore.addUser(user);
        if (saltedUser) {
          return h.response(saltedUser).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError }
    
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all userApi",
    notes: "All userApi removed from megalithic",
  },

  // fix later: random id deletes last value
  
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
            await db.userStore.deleteUserById(request.params.id);
            const users = await db.userStore.getAllUsers();

            return users;
        }catch (err) {
            return Boom.serverUnavailable("No Monument with this id")
        }
    }
  },

  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const { email, password } = request.payload;
        console.log("The request email is: ", email)
        console.log("The request password is: ", password)

        const user = await db.userStore.getUserByEmail(email);
        console.log("The user is : ", user);
        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log("The passwords match; ", passwordsMatch);
        if (!user) {
          return Boom.unauthorized("User not found");
        } if (!passwordsMatch) {
          return Boom.unauthorized("Invalid password");
        } 
          const token = createToken(user);
          return h.response({ success: true, token: token }).code(201);
        
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate  a User",
    notes: "If user has valid email/password, create and return a JWT token",
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError }
  },
};