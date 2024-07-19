import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: "./uploads"
    }),
    MongooseModule.forRoot("mongodb+srv://japhethra369:aYDn1aDpfxPVFQ30@curso.7xfpafw.mongodb.net/sample_mflix"), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    }),
    UsersModule, 
    MoviesModule, 
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
