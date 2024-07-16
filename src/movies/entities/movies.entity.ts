import { Field, ObjectType } from "@nestjs/graphql";
import { Movies } from "../schema/movies.schema";

@ObjectType()
export class MoviesGenresPagination{
    @Field(() => [Movies], {nullable: true, description: ""})
    movies: Movies[];
    @Field(() => Number, {nullable: true, description: ""})
    total: number
}