const mongoose = require('mongoose')

const dataBaseConnection = ()=>{

    const connectionDB = process.env.DDBB;
    mongoose.connect(connectionDB)

    const connection = mongoose.connection;

    connection.once("open",()=>{
        console.log("DBB conection succesful");
    })

}

module.exports=dataBaseConnection;
