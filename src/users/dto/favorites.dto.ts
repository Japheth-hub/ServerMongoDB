import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class Favorites{
  @IsString()
  @IsNotEmpty()
  idUser: string
  @IsString()
  @IsNotEmpty()
  idMovie: string
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean
}