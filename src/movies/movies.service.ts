import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movies } from './schema/movies.schema';
import { Moviesdto } from './dto/movies.dto';
import { Model } from 'mongoose';
import { Genres, Languages, Time } from './dto/movies.dto';

@Injectable()
export class MoviesService {

    constructor(
        @InjectModel(Movies.name)
        private MoviesModel: Model<Movies>
    ){}

    async getMoviesByYear(year:number){
        return await this.MoviesModel.find({year: year})
    }

    async getMoviesByGenresPagination(data: Genres){
        const {genres, skip, limit} = data
        const movies = await this.MoviesModel
            .find({genres: {$in: genres}})
            .skip(skip)
            .limit(limit)
            .exec()
        const total = await this.MoviesModel
            .find({genres: {$in: genres}})
            .countDocuments()
            .exec()
        return {
            movies,
            total
        }
    }

    async getMoviesByLenguagePagination(data: Languages){
        const {languages, skip, limit} = data
        return await this.MoviesModel
            .find({languages: {$in: languages}})
            .skip(skip)
            .limit(limit)
            .exec()
    }

    async getMoviesByRuntime(data:Time){
        const {time, skip, limit} = data
        return await this.MoviesModel
            .find({runtime: {$gte: time, $lte: time+10}})
            .skip(skip)
            .limit(limit)
            .exec()
    }

    async getMoviesByTypePagination(type: string, skip: number){
        return await this.MoviesModel
            .find({type: type})
            .skip(skip)
            .limit(10)
            .exec()
    }

    async updatePropertyMovie(id:string, movie: Moviesdto){
        return await this.MoviesModel.findByIdAndUpdate(id, movie, {new: true})
    }

    async getMoviesShowInfo(skip: number, limit: number){
        const movies = await this.MoviesModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec()
        return movies.map((movie) => {
            return {
                title: movie.title,
                description: movie.fullplot,
                poster: movie.poster,
                runtime: movie.runtime,
                released: movie.released,
                year: movie.year
            }
        })
        
    }

}
