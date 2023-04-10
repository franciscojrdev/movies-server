

export type MovieEntity = {
    id: number,
    name: string,
    platform: string,
    movieGenre: string,
    status: string,
    rate: number,
    comment: string
}


export type Movie = Omit< MovieEntity,"id"|"rate"|"comment">

export type MovieComment = {
    rate:number,
    comment:string
}