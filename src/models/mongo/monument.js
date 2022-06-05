import Mongoose from "mongoose";

const { Schema } = Mongoose;

const monumentSchema = new Schema({
  name: String,
  description: String,
  img: String,
  location: 
  {
    lat: Number,
    lng: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Monument = Mongoose.model("Monument", monumentSchema);