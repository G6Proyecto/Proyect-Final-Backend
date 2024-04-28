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

    async DeleteUserById(id){

        try {
            const deletedUser=await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw error;
        }

    }

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