const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password:{
        type: String,
        required: [true, 'La contraseña es requerida'],   
        match: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
    },
    role:{
        type: String,
        required: [true, 'El rol es requerido'],

    }
});

const UserModel=mongoose.model('user', UserSchema);

module.exports=UserModel;