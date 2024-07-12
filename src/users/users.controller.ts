import { Favorites } from './dto/favorites.dto';
import { login } from './dto/login.dto';
import { crearUser, updateUser } from './dto/users.dto';
import { UsersService } from './users.service';
import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService){}

    @Get()
    async getAllUsers(){
        return await this.UsersService.getAllUsers()
    }

    @Post()
    async createUser(@Body() body: crearUser){
        try {
            return await this.UsersService.createUser(body)
        } catch (error) {
            if(error.code === 11000) throw new ConflictException("Usuario ya existe con ese correo")
            return error
        }
    }

    @Post("login")
    async login(@Body() body: login){
        try {
            return this.UsersService.login(body)
        } catch (error) {
            return error
        }
    }

    @Delete(":id")
    async deleteUserById(@Param("id") id: string){
        const user = await this.UsersService.deleteUserById(id)
        if(!user) throw new NotFoundException("Usuario no existe")
        return user
    }

    @Put("favorites")
    async addMovieToFavorites(@Body() body: Favorites){
        try {
            return body.isActive
                ? await this.UsersService.deleteMovieFavorites(body.idUser, body.idMovie)
                : await this.UsersService.addMovieToFavorites(body.idUser, body.idMovie)
        } catch (error) {
            return error
        }
    }

    @Get("id/:id")
    async getUserById(@Param("id") id:string){
        const user = await this.UsersService.getUserById(id)
        if(!user) throw new NotFoundException("No se encontro este usuario")
        return user
    }

    @Get("name/:name")
    async getUserByLikeName(@Param("name") name:string){
        const users = await this.UsersService.getUserByLikeName(name)
        if(users.length === 0) throw new NotFoundException("No hay usuario que coincidan")
        return users
    }

    @Put("update/:id")
    async updateUser(@Param("id") id: string, @Body() body: updateUser){
        const updateUser = await this.UsersService.updateUserById(id, body)
        if(!updateUser) throw new NotFoundException("User not found")
        return updateUser
    }
}
