import Mongoose from "mongoose";

const { Schema } = Mongoose;

const monumentSchema = new Schema({
  name: String,
  description: String,
  location: 
  {
    lat: Number,
    lng: Number,
  },
  cat: String,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Monument = Mongoose.model("Monument", monumentSchema);