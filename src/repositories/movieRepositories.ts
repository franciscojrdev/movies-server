import { QueryResult } from "pg";
import { connection } from "../config/database.js";
import { Movie, MovieEntity } from "../protocols/Movie.js";

async function insertUnique(newMovie: Movie): Promise<QueryResult<Movie>> {
  return connection.query(
    `INSERT INTO movies(name,platform,"movieGenre",status) VALUES($1,$2,$3,$4);`,
    [newMovie.name, newMovie.platform, newMovie.movieGenre, newMovie.status]
  );
}

async function findMany() {
  return connection.query(`SELECT * FROM movies`);
}

async function findByName(movie_name: string):Promise<QueryResult<MovieEntity>> {
  return connection.query(`SELECT * FROM movies WHERE name LIKE '%${movie_name}%'`);
}

async function  updateByName({rate,comment,id}) {
    return connection.query(`UPDATE movies SET rate=$1,comment=$2 WHERE id = $3`,[rate,comment,id])
}

async function findByGenre(genre: String) {
  return connection.query(
    `SELECT count("movieGenre") AS count_by_genre FROM movies WHERE "movieGenre" ILIKE '%${genre}%' GROUP BY "movieGenre"`
  );
}
async function findByPlatform(platform: string) {
  return connection.query(`
    SELECT count("platform") AS count_by_platform FROM movies WHERE platform like '%${platform}%' GROUP BY platform
    `);
}
async function removeMovie(id:number){
    return connection.query(`
        DELETE FROM movies WHERE id = $1
    `,[id])
}

export default {
  insertUnique,
  findMany,
  findByName,
  findByGenre,
  findByPlatform,
  updateByName,
  removeMovie
};
