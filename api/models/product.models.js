const mongoose = require("mongoose");
const { sex, category } = require("../product-filter/product-filter");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  productImage: { type: String },
  category: {
    type: String,
    enum: [category.SHIRT, category.SPECS, category.TROUSER],
    default: category.NONE,
  },
  sex: { type: String, enum: [sex.MEN, sex.WOMEN], default: sex.UNISEX },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
