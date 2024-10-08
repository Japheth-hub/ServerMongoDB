import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose, { Model } from 'mongoose';
import { crearUser, updateUser } from './dto/users.dto';
import { login } from './dto/login.dto';
import { CommentsService } from 'src/comments/comments.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name)
        private UserModel: Model<Users>,
        private readonly CommenstService: CommentsService,
        private readonly MoviesService: MoviesService

    ){}

    async getAllUsers(){
        return await this.UserModel.find()
    }
    async getUserById(id:string){
        return this.UserModel.findById(id)
    }

    async getUserByLikeName(name:string){
        return await this.UserModel.find({name: {$regex: name, $options: "i"}})//Usamos $option para que no distinga entre Mayusculas y Minusculas
    }

    async updateUserById(id:string, dataUser: updateUser){
        return await this.UserModel.findByIdAndUpdate(id, dataUser, {new:true})
    }

    async createUser(user: crearUser){
        try {
            return await this.UserModel.create(user)
        } catch (error) {
            console.log("🚀 ~ UsersService ~ createUser ~ error:", error)
            return error
            
        }
    }

    async deleteUserById(id: string){
        return await this.UserModel.findByIdAndDelete(id)
    }

    async login(body: login){
        const user = await this.UserModel.findOne({email: body.email})
        if(!user) return {success: false, message: "Usuario no existe, favor de registrarse"}
        if(user.password !== body.password) return {success: false, message: "Contraseña es incorrecta"}
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }, 
            success: true
        }
    }

    async addMovieToFavorites(idUser: string, idMovie: string){
        return this.UserModel.findByIdAndUpdate(
            idUser, 
            {$addToSet: {favorites: idMovie}},
            {new:true}
        )
    }

    async deleteMovieFavorites(idUser: string, idMovie: string){
        return this.UserModel.findByIdAndUpdate(
            idUser,
            {$pull: {favorites: idMovie}},
            {new: true}
        )
    }
}
