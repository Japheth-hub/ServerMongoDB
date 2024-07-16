import { MoviesService } from './movies.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Movies } from './schema/movies.schema';
import { Genres } from './dto/movies.dto';
import { MoviesGenresPagination } from './entities/movies.entity';

@Resolver()
export class MoviesResolver {

constructor(
  private moviesService: MoviesService
){}

  @Query(() => [Movies], {name: "getMoviesByYear"})
  async getMoviesByYear(
    @Args("year", {type: () => Number}) year: number
  ){
    return await this.moviesService.getMoviesByYear(year)
  }

  @Query(() => MoviesGenresPagination, {name: "getMoviesByGenresPagination"})
  async getMoviesByGenresPagination(
    @Args("data", {type: () => Genres}) data: Genres
  ){
    return await this.moviesService.getMoviesByGenresPagination(data)
  }
}
