import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [
    UsersModule,
    MoviesModule
  ],
  controllers: [SocketController],
  providers: [SocketService, SocketGateway]
})
export class SocketModule {}
