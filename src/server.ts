import 'dotenv/config';

import express from 'express';
import "express-async-errors";
import morgan from "morgan";
import {getAll, getOneById, create, updateById, deleteById } from "./controllers/planets"

const app = express()

app.use(morgan("dev"));
app.use(express.json());

app.get('/api/planets', getAll);

app.get('/api/planets/:id', getOneById);

app.post('/api/planets', create)

app.put('/api/planets/:id', updateById);

app.delete('/api/planets/:id', deleteById);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}`)
});