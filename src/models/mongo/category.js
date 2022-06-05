import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = Schema({
 typeMonument: String,
});

export const Category = Mongoose.model("Category", categorySchema);