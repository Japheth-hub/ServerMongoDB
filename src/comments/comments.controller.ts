import { CommentsService } from './comments.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { fechaComments } from './dto/comments.dto';
import { Comments } from './schema/comments.schema';

@Controller('comments')
export class CommentsController {

    constructor(
        private CommentsService: CommentsService
    ){}

    @Get("name/:name")
    async getCommentsByName(@Param("name") name: string){
        return await this.CommentsService.getCommentsByName(name)
    }

    @Get("CommentsAndMovies")
    async getCommentWithMoviesInfo(
        @Query("skip") skip: string,
        @Query("limit") limit: string
    ){
        return this.CommentsService.getCommentWithMoviesInfo(parseInt(skip), parseInt(limit))
    }

    @Get("countCommentsMovies")
    async getTotalCommentsByUsers(
        @Query("skip") skip: string,
        @Query("limit") limit: string
    ){
        return this.CommentsService.getTotalCommentsByUsers(parseInt(skip), parseInt(limit))
    }

    @Get("commentsOfUsersNoRegisters")
    async getUserNoRegiters(){
        return this.CommentsService.getUserNoRegiters()
    }

    @Get("moviesNotFound")
    async getMoviesNotFount(){
        return this.CommentsService.getMoviesNotFount()
    }

    @Post("getCommentsByDate")
    async getCommentsByDate(@Body() body: fechaComments){
        return this.CommentsService.getCommentsByDate(body)
    }

    @Post()
    async createComment(@Body() body: Comments){
        try {
            const comment: Comments = {
                name: body.name,
                email: body.email,
                text: body.text,
                movie_id: body.movie_id,
                date: new Date()
            }
            return await this.CommentsService.createComment(comment)
        } catch (error) {
            return error
        }
    }

}
