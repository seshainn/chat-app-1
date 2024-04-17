//const express = require('express')
//const chats = require('./data/data')
//const dotenv = require('dotenv')
//const cors = require('cors')
import express from 'express';
import { chats } from './data/data.js';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from "url";
import { connect } from './config/db.js';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'
import errorHandler from "./middleware/errorHandler.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
//app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


dotenv.config()

connect()

app.get('/', (req, res) => {
    res.json('Just a Home Page')
})

app.use('/api/user', userRoutes)

/*app.post('/api/user', upload.single("pic"), (req, res) => {
    res.json("I am in server.js")
})


app.get('/api/chats', (req, res) => {
    res.json(chats)
})

app.get('/api/chats/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id)
    if (singleChat) {
        res.send(singleChat)
    } else {
        res.status(404).send("Chat not found")
    }
    res.send(singleChat)
})
*/
app.use(errorHandler)
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})