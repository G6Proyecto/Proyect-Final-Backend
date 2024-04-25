const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path=require('path');
const databaseConnection = require('./databaseConnection.js')
const { log } = require('console');

const app=express();

require('dotenv').config();

databaseConnection();


app.set('port', process.env.PORT || 9001);

app.listen(app.get('port'), ()=>{console.log(`SERVER READY IN PORT ${app.get('port')}`);})

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))

app.use(cors());

app.use(express.static(path.join(__dirname,'../public')))