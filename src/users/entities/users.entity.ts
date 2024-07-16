import { Moviesdto } from './../../movies/dto/movies.dto';
import { Favorites } from './../dto/favorites.dto';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Users{
  @Field(() => String, {nullable: true})
  _id: string
  @Field(() => String, {nullable: true})
  name: string
  @Field(() => String, {nullable: true})
  email: string
  @Field(() => String, {nullable: true})
  password: string
  @Field(() => [String], {nullable: true})
  favorites: string[]
  @Field(() => [String], {nullable: true})
  movies: string[]
}
