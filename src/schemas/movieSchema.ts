import Joi from 'joi'


export const movieSchema = Joi.object({
    name: Joi.string().required(),
    streamingPlatform:Joi.string().min(3).required(),
    movieGenre: Joi.string().required(),
    
})