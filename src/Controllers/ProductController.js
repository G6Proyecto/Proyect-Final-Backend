
const ProductModel = require("../Models/ProductModel");

const {
    validateTitle,
    validateCategory,
    validatePrice,
    validateDescription,
    validateDateStock,
    validateUrl
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
    if (!validateTitle(title)) {
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
    if (!validateDateStock(dateStock)) {
        throw new Error("La fecha de actualización del producto inválida");
    }
    if (!validateUrl(url)) {
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

  async UpdateProduct(req, res) {
    const {id} = req.params;
    const newData = req.body;

    try {
      const product = await ProductModel.findByIdAndUpdate(id, newData, { new: true });

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      return res.status(200).json({ message: "Producto actualizado exitosamente", product });
    } catch (error) {
      console.error("Error al intentar actualizar el producto", error);
      return res.status(500).json({ message: "Error al intentar actualizar el producto" });
    }
  }

  async DeleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      return res.status(200).json({ message: "Producto eliminado exitosamente", product });
    } catch (error) {
      console.error("Error al intentar eliminar el producto", error);
      return res.status(500).json({ message: "Error al intentar eliminar el producto" });
    }
  }
}



module.exports = ProductController;