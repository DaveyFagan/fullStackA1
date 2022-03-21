import Mongoose from "mongoose";

const { Schema } = Mongoose;

const monumentSchema = new Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "place",
  },
});

export const Monument = Mongoose.model("Monument", monumentSchema);