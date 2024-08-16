import { forwardRef, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from './schema/movies.schema';
import { MoviesResolver } from './movies.resolver';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movies.name, schema: MoviesSchema }
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule)
  ],
  providers: [MoviesService, MoviesResolver],
  controllers: [MoviesController],
  exports: [MoviesService]
})
export class MoviesModule {}
