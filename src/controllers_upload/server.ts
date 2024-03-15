import 'dotenv/config';

import multer from "multer";
import express, { Request } from 'express';
import "express-async-errors";
import morgan from "morgan";
import {getAll, getOneById, create, updateById, deleteById, createImage } from "./planets.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }, 
})
const upload = multer({ storage });
const app = express()

app.use(morgan("dev"));
app.use(express.json());

app.get('/api/planets', getAll);

app.get('/api/planets/:id', getOneById);

app.post('/api/planets', create)

app.put('/api/planets/:id', updateById);

app.delete('/api/planets/:id', deleteById);

app.post('/api/planets/:id/image', upload.single("image"), createImage)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}`)
});