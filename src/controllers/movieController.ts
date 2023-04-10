import { Request, Response } from "express";
import { movieSchema, updateMovieSchema } from "../schemas/movieSchema.js";
import movieRepositories from "../repositories/movieRepositories.js";
import { Movie, MovieComment } from "../protocols/Movie.js";

async function create(req: Request, res: Response) {
  const newMovie = req.body as Movie;

  const { error } = movieSchema.validate(newMovie);

  if (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
  try {
    const { rowCount } = await movieRepositories.insertUnique(newMovie);

    return res.send(`Movie inserted: ${rowCount}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function listAll(req: Request, res: Response) {
  const result = await movieRepositories.findMany();

  console.log(result);

  res.send(result.rows);
}

async function rateMovie(req: Request, res: Response) {
  const { movie_name } = req.params;
  const { rate, comment } = req.body as MovieComment;

  const { error } = updateMovieSchema.validate({ rate, comment });

  if (error) {
    return res.status(400).send({
      message: error.message,
    });
  }

  const {
    rowCount,
    rows: [result],
  } = await movieRepositories.findByName(movie_name);

  if (!rowCount) return res.sendStatus(404);

  await movieRepositories.updateByName({
    rate,
    comment,
    id: result.id,
  });

  res.sendStatus(201);
}

async function quantByGenre(req: Request, res: Response) {
  const { genre } = req.params;

  const {
    rowCount,
    rows: [result],
  } = await movieRepositories.findByGenre(genre);

  if (!rowCount) return res.sendStatus(404);

  res.status(200).send(result);
}

async function quantByPlatform(req: Request, res: Response) {
  const { platform } = req.params;

  const {
    rowCount,
    rows: [result],
  } = await movieRepositories.findByPlatform(platform);

  if (!rowCount) return res.sendStatus(404);

  res.status(200).send(result);
}

async function removeMovie(req: Request, res: Response) {
  const id = +req.params.id;

  const result = await movieRepositories.removeMovie(id);

  console.log(result.rows);

  res.send(201);
}
export default {
  create,
  listAll,
  rateMovie,
  quantByGenre,
  quantByPlatform,
  removeMovie,
};
