import { Body, Controller, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Genres, Languages, Moviesdto, Time } from './dto/movies.dto';
import { Booleanos } from './dto/probandoBoleanos.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
export class MoviesController {

    constructor(
        private MoviesService: MoviesService
    ){}

    @Get("year/:year")
    async getMoviesByYear(@Param("year") year:number){
        const movies = await this.MoviesService.getMoviesByYear(year)
        const newData = movies.map((movie)=>{
            return {
                title: movie.title,
                poster: movie.poster,
                genres: movie.genres,
                year: movie.year
            }
        })
        return newData
    }

    @Post("genres")
    async getMoviesByGenresPagination(@Body() data: Genres){
        return await this.MoviesService.getMoviesByGenresPagination(data)
    }

    @Post("languages")
    async getMoviesByLenguagePagination(@Body() data: Languages){
        return await this.MoviesService.getMoviesByLenguagePagination(data)
    }

    @Post("time")
    async getMoviesByRuntime(@Body() data:Time){
        return await this.MoviesService.getMoviesByRuntime(data)
    }

    @Get("type/:type")
    async getMoviesByTypePagination(@Param("type") type:string, @Query() skip:number){
        return await this.MoviesService.getMoviesByTypePagination(type, skip)
    }

    @Put("updateMovie/:id")
    async updatePropertyMovie(@Param("id") id: string, @Body() movie: Moviesdto){
        return await this.MoviesService.updatePropertyMovie(id, movie)
    }

    @Get("showMovies")
    async getMoviesShowInfo(
        @Query("skip") skip: number, 
        @Query("limit") limit: number
    ){
        return await this.MoviesService.getMoviesShowInfo(skip, limit)
    }

    @Post("getByAnyProps")
    async getByAnyProps(
        @Body() body: any
    ){
        return await this.MoviesService.getByAnyProps(body.text, body.page, body.limit)
    }

    @Post("probandoBoleanos")
    @UseInterceptors(FileInterceptor('file'))
    async probandoBoleanos(@Body() boleanos: Booleanos){
        console.log(boleanos)
        return await this.MoviesService.probandoBoleanos(boleanos)
    }
}
