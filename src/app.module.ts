import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://japhethra369:aYDn1aDpfxPVFQ30@curso.7xfpafw.mongodb.net/sample_mflix"), 
    UsersModule, 
    MoviesModule, 
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
