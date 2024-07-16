import { Args, Query, Resolver } from '@nestjs/graphql';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {

  constructor(
    private usersService: UsersService
  ){}

  @Query(() => [Users], {name: "getAllUsers"})
  async getAllUsers(){
    return await this.usersService.getAllUsers()
  }

  @Query(() => Users, {name: "getUserById"})
  async getUserById(
    @Args("id") id: string
  ){
    return await this.usersService.getUserById(id)
  }

  @Query(() => [Users], {name: "getUserByLikeName"})
  async getUserByLikeName(
    @Args("name") name: string
  ){
    return await this.usersService.getUserByLikeName(name)
  }

}
