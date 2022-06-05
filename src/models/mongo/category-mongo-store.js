import { Category } from "./category.js";

export const categoryMongoStore = {
  async getAllCategorys() {
    const categorys = await Category.find().lean();
    return categorys;
  },

  async findById(id) {
    const category = await Category.findOne({ _id: id }).lean();
    return category;
  },

  async findByName(typeMonument) {
    const category = await Category.findOne({
      typeMonument
    });
    return category;
  },
};