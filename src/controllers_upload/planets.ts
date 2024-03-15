import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgress://postgres:postgres@localhost:5432/postgres");

const setUpDb = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );
    `)

    await db.none(`INSERT INTO planets (name) VALUE ('Earth)`);
    await db.none(`INSERT INTO planets (name) VALUE ('Mars)`);   
}
setUpDb();

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets`);
    res.status(200).json(planets);
}

const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = await db.one(`SELECT * FROM planets WHERE id === $1`, Number(id));
    res.status(200).json(planet);
}

const planetSchema = Joi.object({
    idname: Joi.string().required()
});

const create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newPlanet = { name };
    const validateNewPlanet = planetSchema.validate(newPlanet);

    if (validateNewPlanet.error) {
        return res.status(400).json({ message: validateNewPlanet.error.details[0].message });
    } else {
        await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
  
        res.status(201).json({ message: "The planet was created"}); 
    }    
}

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])

    res.status(200).json({ message: "The planet was updated."});
}

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;  
    await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
    res.status(200).json({ message: "The planet was deleted."});
}

const createImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fileName = req.file?.path;

    if (fileName) {
        db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
        res.status(201).json({ message: "Planet image uploaded successfully"})
    } else {
        res.status(400).json({ message: "Planet image failed to upload."})
    }
}

export {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById,
    createImage
}

//per l'utilizzo delle funzioni esportate: server_pg.js
