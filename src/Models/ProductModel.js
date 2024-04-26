const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    require: [true, "El nombre del producto es requerido"],
    minLength: 4,
    maxLength: 50,
  },
  category: {
    type: String,
    require: [true, "La categoría del producto es requerida"],
  },
  price: {
    type: Number,
    require: [true, "EL precio del producto es requerido"],
    min: 100,
    max: 10000,
  },
  description: {
    type: String,
    require: [true, "La descripción del producto es requerida"],
    minLength: 4,
    maxLength: 500,
  },
  dateStock: {
    type: Date,
    require: [
      true,
      "La fecha de actualización del stock del producto es requerida",
    ],
  },
  url: {
    type: String,
    require: [true, "La imagen del producto es requerida"],
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;