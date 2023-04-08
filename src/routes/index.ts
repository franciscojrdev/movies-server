import { Router } from "express";
import movieRoutes from "./movieRoutes.js";


const routes = Router()

routes.use("/movies",movieRoutes)

export default routes;