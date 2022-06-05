import Boom from "@hapi/boom";
import { db } from "../models/db.js";

 import { IdSpec, MonumentSpec, MonumentSpecPlus, MonumentArraySpec, MonumentImage } from "../models/joi-schemas.js";
 import { validationError } from "./logger.js";

export const monumentApi = {
 

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const monuments = await db.monumentStore.getAllMonuments();
        return monuments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    
    tags: ["api"],
    response: { schema: MonumentArraySpec, failAction: validationError },
    description: "Get all monumentApi",
    notes: "Returns all monumentApi",
    
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const monument = await db.monumentStore.getMonumentById(request.params.id);
        if (!monument) {
          return Boom.notFound("No Monument with this id");
        }
        return monument;
      } catch (err) {
        return Boom.serverUnavailable("No Monument with this id");
      }
    },
    
    tags: ["api"],
    description: "Find a monument",
    notes: "Returns a monument",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: MonumentSpecPlus, failAction: validationError },
    
  },


  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const placeId = request.payload.id;
        console.log("place id is: ", placeId)
        const monument = request.payload;
        console.log("monument is: ", monument)
        const newMonument = await db.monumentStore.addMonument(monument.placeid, monument);
        console.log("New Monument is : ", newMonument)
        if (newMonument) {
          return h.response(newMonument).code(200);
        }
        return Boom.badImplementation("error creating monument");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    
    tags: ["api"],
    description: "Create a monument",
    notes: "Returns the newly created monument",
    validate: { payload: MonumentSpec },
    response: { schema: MonumentSpecPlus, failAction: validationError },
    
    
  },


deleteOne: {
  auth: {
    strategy: "jwt",
  },
  handler: async function (request, h) {
    try {
      const monument = await db.monumentStore.getMonumentById(request.params.id);
      if (!monument) {
        return Boom.notFound("No monument with this id");
      }
      console.log("Monument is :", monument)
      await db.monumentStore.deleteMonumentById(monument._id);
      return h.response().code(204);
    } catch (err) {
      return Boom.serverUnavailable("No monument with this id");
    }
  },
  
  tags: ["api"],
    description: "Delete a monument",
    validate: { params: { id: IdSpec }, failAction: validationError },
    
},

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.monumentStore.deleteAllMonuments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    
    tags: ["api"],
    description: "Delete all monumentApi",
    
  },

  createImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        
        const monument = await db.monumentStore.getMonumentById(request.params.id)
        console.log("The payload sent from client side is :",request.payload)
        console.log("monument is: ", monument)
        const file = request.payload.img;
        console.log("Payload of the image file: ", file)
        
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.img);
          console.log("The url is : ", url)
          monument.img = url;
          const uploadedImage = db.monumentStore.updateMonument(monument);
          console.log("The updated monument with image file: ", uploadedImage)
          return uploadedImage;
          
        } 

        if (uploadImage) {
          return h.response(uploadImage).code(200);
        }
        return Boom.badImplementation("error creating monument image");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    },
    
    tags: ["api"],
    description: "Create a image",
    notes: "Returns the newly created image",
    /*
    validate: { payload: MonumentImage },
    response: { schema: MonumentSpecPlus, failAction: validationError },
    */
    
  },

  
};