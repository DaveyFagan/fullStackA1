import { db } from "../models/db.js";
import { MonumentSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const monumentController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const categories = await db.categoryStore.getAllCategorys();
      const placeMonuments = await db.monumentStore.getMonumentsByPlaceId(place);
      console.log("All the places monuments####################")
      console.log(placeMonuments);
      console.log("Monuments:", "Place: ", place)
      const viewData = {
        title: "Place",
        place: place,
        categories: categories,
        monuments: placeMonuments,
      };
      return h.view("monument-view", viewData);
    },
  },


  addMonument: {
    validate: {
      // payload: MonumentSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const place = await db.placeStore.getPlaceById(request.params.id)
        return h.view("monument-view", { title: "Add Monument error", place: place, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const category1 = request.payload.category;
      const finalCat = await db.categoryStore.findByName(category1);
      const finalCatId = finalCat._id;
      console.log(finalCat._id);
      console.log("################CATEGORY###################")
      console.log(category1);
      const newMonument = {
        name: request.payload.name,
        description: request.payload.description,
        location:
        {
          lat: request.payload.lat,
          lng: request.payload.lng,
        },
        category: finalCatId,
        
      };
      await db.monumentStore.addMonument(place._id, newMonument);
      return h.redirect(`/place/${place._id}`);
    },
  },

  deleteMonument: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      await db.monumentStore.deleteMonumentById(request.params.monumentid);
      return h.redirect(`/place/${place._id}`);
    },
  },

  updateMonument: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      
      const monument = await db.monumentStore.getMonumentById(request.params.monumentid);
      const newMonument = {
        name: request.payload.name,
        description: request.payload.description,
        location:
        {
          lat: request.payload.lat,
          lng: request.payload.lng,
        },
        category: request.payload.category,
      };
      console.log("New Monument : ", newMonument)
      await db.monumentStore.updateMonument(newMonument, monument);
      return h.redirect(`/place/${place._id}`);
    },
  },

  updateIndex: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const monument = await db.monumentStore.getMonumentById(request.params.monumentid);
      const categories = await db.categoryStore.getAllCategorys();
      console.log("The name of this monument is : ", monument);
      console.log("The name of this place is : ", place);
      const viewData = {
        title: "Update monument",
        place: place,
        monument: monument,
        categories: categories
      };
      return h.view("updatemonument-view", viewData);
    }
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        console.log(request.params)
        const file = request.payload.imagefile;
        console.log("print image file: ", file)
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          place.img = url;
          db.placeStore.updatePlace(place);
        }
        return h.redirect(`/place/${place._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/place/${place._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },

  uploadMonumentImage: {
    handler: async function(request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        
        const monument = await db.monumentStore.getMonumentById(request.params.monumentid)
        console.log("Request params: ",request.params)
        const file = request.payload.imagefile;
        console.log("Payload of the image file: ", file)
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          monument.img = url;
          db.monumentStore.updateMonument(monument);
        }
        return h.redirect(`/place/${place._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/place/${place._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },

  deleteImage: {
    handler: async function(request, h) {
        const place = await db.placeStore.getPlaceById(request.params.id);
        // const image = place.img;
        // console.log("Image:", image)
        // await imageStore.deleteImage(image);

        return h.redirect(`/place/${place._id}`);
    }
  }, 
};