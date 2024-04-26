const ProductRoutes = (base, app) => {
    const prodController = new ProductController();
  
    app.post(${base}, async (req, res) => {
      try {
        const {
          title,
          category,
          price,
          description,
          dateStock,
          url
        } = req.body;
        await prodController.Create(
            title,
            category,
            price,
            description,
            dateStock,
            url
        );
        res.status(201).json({ message: "Existo al crear el producto" });
      } catch (error) {
        console.error("Error al crear el producto", error);
        return res
          .status(500)
          .json({ message: "Ocurrio un error al crear el producto" });
      }
    });
  
  
    app.get(${base}/:id, async(req, res)=>{
      try {
          const {id}=req.params;
          const response=await prodController.GetById(id);
          return res.status(200).json(response);
      } catch (error) {
          console.error(`Error al obtener el producto con id`, error);
          return res.status(500).json({message:"Ocurrio un error al intentar obtener el producto"}); 
      }
  });
  
    app.get(${base}/news/product, async (req, res) => {
      try {
        const response = await prodController.GetNewsProducts();
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error al obtener las productos destacados", error);
        return res.status(500).json({
          message: "Ocurrio un error al intentar obtener los productos destacados",
        });
      }
    });
  
    app.get(${base}, async (req, res) => {
      try {
        const response = await prodController.GetAllProducts();
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error al obtener todos los productos", error);
        return res.status(500).json({
          message: "Ocurrió un error al intentar obtener todos los productos",
        });
      }
    });
  
    app.get(${base}/categories/product, async (req, res) => {
      try {
        const response = await prodController.GetAllCategories();
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error al obtener las categorias", error);
        return res.status(500).json({
          message: "Ocurrio un error al intentar obtener las categorias",
        });
      }
    });
  
    app.put(${base}/update/id, async(req, res)=>{
      try {
        const {_id}=req.params;
        const newData=req.body;
        await prodController.UpdateProduct(_id, newData);
  
        return res.status(201).json({message: "Se actualizó el producto exitosamente"})
      } catch (error) {
        console.error("Error al intentar actualizar el producto", error)
      }
    });
  
  };
  
  module.exports = ProductRoutes;