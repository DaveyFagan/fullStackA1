
import { userMemStore } from "./mem/user-mem-store.js";
import { monumentMemStore } from "./mem/monument-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { monumentJsonStore } from "./json/monument-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";


import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { monumentMongoStore } from "./mongo/monument-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";

export const db = {
  userStore: null,
  monumentStore: null,
  placeStore: null,
  

  init(storeType) {
    switch (storeType) {
      case "json":    
        this.userStore = userJsonStore;
        this.monumentStore = monumentJsonStore;
        this.placeStore = placeJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placeStore = placeMongoStore;
        this.monumentStore = monumentMongoStore;
        this.categoryStore = categoryMongoStore;
        connectMongo();
        break;
      default:  
        this.userStore = userMemStore;
        this.monumentStore = monumentMemStore;
        this.placeStore = placeMemStore;
    
    } 
  },
};