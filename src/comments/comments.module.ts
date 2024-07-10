import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './schema/comments.schema';
import { UsersService } from 'src/users/users.service';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Users.name, schema: UsersSchema}
    ])
  ],
  providers: [CommentsService, UsersService],
  controllers: [CommentsController]
})
export class CommentsModule {}
