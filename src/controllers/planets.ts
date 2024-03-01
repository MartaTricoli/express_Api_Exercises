import { Request, Response } from "express";

type Planet = {
    id: number,
    name: string,
  };
  
type Planets = Planet[];
  
let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
];

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
}

const getOneById = (req: Request, res: Response) => {
    const id = req.params.id;
    const planet = planets.find(planet => planet.id === Number(id) )
    res.status(200).json(planet);
}

const create = (req: Request, res: Response) => {
    const {id, name} = req.body;
    const newPlanet = {id, name};
    planets = [...planets, newPlanet];
  
    console.log(planets);
  
    res.status(201).json({ message: "New planet was created"});
}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(planet => planet.id === Number(id) ? ({ ...planet, name}) : planet);
  
    console.log(planets);
  
    res.status(200).json({ message: "The planet was updated."});
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    planets = planets.filter(planet => planet.id !== Number(id));
  
    res.status(200).json({ message: "The planet was deleted."})
}

export {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
}