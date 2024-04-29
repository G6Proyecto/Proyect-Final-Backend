const UserController=require('../Controllers/UserController');
const Auth=require('../Util/AuthMiddlewares');

const UserRoutes=(base, app)=>{

    const controller=new UserController();

    
    app.get(`${base}/listuser`, async (req, res) => {
        try {
          const response = await controller.GetAllUsers();
          return res.status(200).json(response);
        } catch (error) {
          console.error("Error al intentar obtener los usuario ", error);
          return res.status(500).json({
            message: "Error al intentar obtener los usuarios",
          });
        }
      });



    app.post(`${base}/create-admin`, Auth.isAuth, Auth.isAdmin, async(req, res, next)=>{
        try {
            
            const {email, password}=req.body;
            const response=await controller.CreateNewAdmin(email, password);
            return res.status(201).json({message:"Exito al crear el usuario"});
        } catch (error) {
            console.error('Error al crear un nuevo usuario-->', error);
            return res.status(500).json({message:"Ocurrió un error al intentar crear un usuario"})
        }
    });




    app.post(`${base}`, async(req, res, next)=>{
        try {
            
            const {email, password}=req.body;
            const response=await controller.CreateNewUser(email, password);
            return res.status(201).json({message:"Exito al crear el usuario"});
        } catch (error) {
            console.error('Error al crear un nuevo usuario-->', error);
            return res.status(500).json({message:"Ocurrió un error al intentar crear un usuario"})
        }
    });



    app.put(`${base}/updateuser/:id`, async (req,res)=> {
        try {
           
            await controller.Updateuser(req, res);
            return res.status(200).json({message:"se actualizo correctamente"})
        } catch (error) {
            console.error("error al actualizar usuario", error)
            return res.status(500).json({message:"ocurrio un error al intentar actualizar el usuario"})

        };
    })


    app.delete(`${base}/deleteuser/:id`, async(req, res)=>{
        try {
            const response=await controller.DeleteUserById(req,res);
            console.log('USUARIO ELIMINADO-->', JSON.stringify(response));
            return res.status(200).json({message:"Exito al eliminar el usuario"});
        } catch (error) {
            console.error('Error al eliminar un usuario', error);
            return res.status(500).json({message: "Ocurrió un error al intentar eliminar un usuario"})
        }
    });

    app.post(`${base}/login`, async(req, res, next)=>{
        try {
            const response = await controller.Login(req, res);
            return response;
        } catch (error) {
            next(error)
        }
    })

};

module.exports=UserRoutes;