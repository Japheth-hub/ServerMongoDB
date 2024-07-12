import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comments } from './schema/comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { fechaComments } from './dto/comments.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comments.name)
        private CommentsModel: Model<Comments>,
        private readonly UsersService: UsersService
    ) { }

    async getCommentsByName(name: string) {
        return this.CommentsModel.find({ name: name })
    }

    async getCommentWithMoviesInfo(skip: number, limit: number) {
        return this.CommentsModel
            .find()
            .skip(skip)
            .limit(limit)
            .select("name movie_id text date")
            .populate({
                path: "movie_id",
                model: "Movies",
                select: "title plot runtime year"
            })
    }

    async getTotalCommentsByUsers(skip: number, limit: number) {
        const groupCommentByName = await this.CommentsModel.aggregate([
            {
                $group: {
                    _id: "$name",
                    totalComments: { $sum: 1 }
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]).exec()
        const countTotalGroups = await this.CommentsModel.aggregate([
            {
                $group: {
                    _id: "$name"
                }
            }, {
                $group: {
                    _id: null,
                    totalGroups: { $sum: 1 }
                }
            }
        ]).exec()
        return {
            groups: groupCommentByName,
            total: countTotalGroups?.[0].totalGroups
        }
    }


    async getUserNoRegiters() {
        const usersComments = await this.CommentsModel.aggregate([{
            $group: {
                _id: "$name"
            }
        }])
        const users = await this.UsersService.getAllUsers()
        const listUsers = users.map((user) => user.name)
        const listUsersComments = usersComments.map((user) => user._id)
        // console.log(listUsers)
        // console.log(listUsersComments)
        // const usersYesComments = listUsers.filter((user) => listUsersComments.includes(user) && user)
        const usersNotComments = listUsers.filter((user) => !listUsersComments.includes(user) && user)
        // console.log(usersYesComments.length)
        // console.log(usersNotComments)
        // const usersYesRegisters = listUsersComments.filter((user) => listUsers.includes(user) && user)
        const usersNotRegisters = listUsersComments.filter((user) => !listUsers.includes(user) && user)
        // console.log(usersYesRegisters.length)
        // console.log(usersNotRegisters.length)
        const allUsersInactivity = {
            usersNotComments,
            usersNotRegisters
        }
        return allUsersInactivity
    }

    async getMoviesNotFount() {
        return await this.CommentsModel.aggregate([
            {
                $lookup: {
                    from: "movies",
                    localField: "movie_id",
                    foreignField: "_id",
                    as: "movie"
                }
            }, {
                $project: {
                    movie_id: "$movie_id",
                    movie: { $first: "$movie" }
                }
            }, {
                $match: {
                    movie: { $eq: null }
                }
            }, {
                $project: {
                    movie_id: 1
                }
            }, {
                $group: {
                    _id: "$movie_id",
                    total: { $sum: 1 }
                }
            }
        ])
    }

    async getCommentsByDate(fecha: fechaComments) {
        const match: fechaComments = {
            año: fecha.año
        }
        if (fecha.mes) {
            match.mes = fecha.mes
        }
        if (fecha.dia) {
            match.dia = fecha.dia
        }
        return await this.CommentsModel.aggregate([{
            $project: {
                name: "$name",
                text: "$test",
                año: { $year: "$date" },
                mes: { $month: "$date" },
                dia: { $dayOfMonth: "$date" }
            }
        }, {
            $match: match
        }])
    }

    async createComment(comment: Comments){
        try {
            return await this.CommentsModel.create(comment)
        } catch (error) {
            return error
        }
    }
}
