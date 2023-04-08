import { Router } from "express";
import movieController from "../controllers/movieController.js";

const movieRoutes = Router();

movieRoutes.post("/",movieController.create);
movieRoutes.get("/",movieController.listAll);
movieRoutes.get("/genre/:genre",movieController.quantByGenre)
movieRoutes.get("/plataform/:platform",movieController.quantByPlatform)
movieRoutes.delete("/:id",movieController.removeMovie)
movieRoutes.patch("/:movie_name",movieController.rateMovie)

export default movieRoutes;
