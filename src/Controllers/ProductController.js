
const ProductModel = require("../Models/ProductModel");

const {
    title,
    category,
    price,
    description,
    dateStock,
    url
} = require("../Util/helpers");

class ProductController {
  async Create(
    title,
    category,
    price,
    description,
    dateStock,
    url
  ) {
    if (!validateName(title)) {
      throw new Error("El nombre del producto es inválido");
    }
    if (!validateCategory(category)) {
      throw new Error("La categoría del producto es invalida");
    }
    if (!validatePrice(price)) {
        throw new Error("El precio del producto es inválido");
      }
    if (!validateDescription(description)) {
      throw new Error("La descripción del producto inválido");
    }
    if (!validateStockUpdateDate(dateStock)) {
        throw new Error("La fecha de actualización del producto inválida");
    }
    if (!validateImageUrl(url)) {
      throw new Error("La url de la imagen del producto inválida");
    }
    try {
      const newProduct = new ProductModel({
        title: title,
        category: category,
        price: price,
        description: description,
        dateStock: dateStock,
        url: url,
      });

      await newProduct.save();
    } catch (error) {
      throw error;
    }
  }

  async GetById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }


  async GetAllCategories() {
    try {
      let CategoriesResp = [];

      CategoriesResp = await CategoriesModel.find();

      return CategoriesResp;
    } catch (error) {
      throw error;
    }
  }

  async GetAllProducts() {
    try {
      const allProducts = await ProductModel.find();
      return allProducts;
    } catch (error) {
      throw error;
    }
  }

  async UpdateProduct(_id, newData) {
    try {
      const product = await ProductModel.findById(_id);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      product.title = newData.name;
      product.category = newData.category;
      product.price = newData.price;
      product.description = newData.description;
      product.dateStock = newData.dateStock;
      product.url = newData.url;

      await product.save();
    } catch (error) {
      throw error;
    }
  };

}

module.exports = ProductController;