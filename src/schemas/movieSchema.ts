import Joi from 'joi'


export const movieSchema = Joi.object({
    name: Joi.string().required(),
    platform:Joi.string().min(3).required(),
    movieGenre: Joi.string().required(),
    status: Joi.string().required().valid('to_watch','watched'),
    
})


export const updateMovieSchema = Joi.object({
    rate: Joi.number().min(1).max(10).required(),
    comment: Joi.string().required()
})