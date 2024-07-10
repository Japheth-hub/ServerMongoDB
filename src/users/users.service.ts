import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { Model } from 'mongoose';
import { crearUser, updateUser } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name)
        private UserModel: Model<Users>
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
        return await this.UserModel.create(user)
    }

    async deleteUserById(id: string){
        return await this.UserModel.findByIdAndDelete(id)
    }
}
