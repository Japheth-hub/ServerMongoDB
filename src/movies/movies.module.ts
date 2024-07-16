import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from './schema/movies.schema';
import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movies.name, schema: MoviesSchema }
    ])
  ],
  providers: [MoviesService, MoviesResolver],
  controllers: [MoviesController]
})
export class MoviesModule {}
