const UserModel=require('../Models/UserModel');
const bcrypt = require('bcrypt');
const helpers=require('../Util/helpers');
const jwt=require('jsonwebtoken');

class UserController{
    
    async CreateNewAdmin(email, password, role){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error('Formato email invalido')
            };

            if (!helpers.ValidatePassword(password)) throw new Error('Formato de contraseña incorrecto');

            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser=new UserModel({
                email:email,
                password:hash,
                role:"Administrador",
            });

            const savedUser=await newUser.save();
            return savedUser;

        } catch (error) {
            throw error;
        }
    }

    async CreateNewUser(email, password, role){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error('Formato email invalido')
            };

            if (!helpers.ValidatePassword(password)) throw new Error('Formato de contraseña incorrecto');

            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser=new UserModel({
                email:email,
                password:hash,
                role:"cliente",
            });

            const savedUser=await newUser.save();
            return savedUser;

        } catch (error) {
            throw error;
        }
    }


    async GetAllUsers() {
        try {
          const allUsers = await UserModel.find();
          return allUsers;
        } catch (error) {
          throw error;
        }
      }

    async DeleteUserById(req,res){
        const { id } = req.params;
        try {
            const deleteUser=await UserModel.findByIdAndDelete(id);
            
      if (!deleteUser) {
        return res.status(404).json({ message: "usuario no encontrado" });
      }

      return res.status(200).json({ message: "usuario eliminado exitosamente", deleteUser });
        } catch (error) {
         console.error("Error al intentar eliminar el usuario", error);
        return res.status(500).json({ message: "Error al intentar eliminar el usuario" });
      }
     }

    async Updateuser(req,res){
        const {id} = req.params;
        const newData = req.body;
        try {
            const Updateuser = await UserModel.findByIdAndUpdate(id, newData, { new: true });
            if (!Updateuser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
              }
        }
        catch (error){
            throw (error)
        }
    };



    async Login(req, res){
        try {
            const body=req.body;

            if (body.email===''||body.email===undefined) {
                throw new Error('Debe enviar un email');
            };

            if (body.password===''||body.password===undefined) {
                throw new Error('Debe enviar una contraseña');
            };

            const user=await UserModel.findOne({email:body.email});
            

            if (user===null) {
                return res.status(404).json({message: 'Email y/o contraseña incorrectos'});
            };

            const compare=await bcrypt.compare(body.password, user.password);

            if (!compare) {
                return res.status(404).json({message: 'Email y/o contraseña incorrectos'});
            };

            const token=jwt.sign({
                _id:user._id,
                role:user.role
            }, process.env.SECRET_KEY, {expiresIn:'1D'});

            return res.status(200).json({email:user.email, role:user.role, token:token});

        } catch (error) {
            
        }
    }

};

module.exports=UserController;