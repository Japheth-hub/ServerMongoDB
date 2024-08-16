import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { MoviesService } from "src/movies/movies.service"
import { crearUser } from "src/users/dto/users.dto"
import { UsersService } from "src/users/users.service"

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: false,
  }
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly userService: UsersService,
    private readonly moviesSerive: MoviesService
  ){}
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log(`Cliente conectado : ${client.id}`)
  }

  handleDisconnect(client: any) {
    console.log(`Cliente desconectado : ${client.id}`)
  }

  @SubscribeMessage("search Users")
  async searchUsers(@MessageBody() message: string){
    const users = await this.userService.getUserByLikeName(message)
    this.server.emit("searching", {
      info: users ?? ["No existe ningun usuario"],
      title: "Buscando en Users"
    })
  }
  @SubscribeMessage("search Movies")
  async searchMovies(@MessageBody() message: string){
    const movies = await this.moviesSerive.getByAnyProps(message, 1, 50)
    this.server.emit("searching", {
      info: movies || ["No existen peliculas"],
      title: "Buscando en Movies"
    })
  }
  @SubscribeMessage("search Comments")
  async searchComments(@MessageBody() message: string){
    this.server.emit("searching", {
      info: message,
      title: "Buscando en Comments"
    })
  }
}