import { Transform, Type } from "class-transformer"
import { IsBoolean } from "class-validator"

export class Booleanos{
  @IsBoolean()
  @Transform(({value}) => value === "true" || value === true)
  nombre: boolean
  @IsBoolean()
  @Transform(({value}) => value === "true" || value === true)
  access: boolean
  @IsBoolean()
  @Transform(({value}) => value === "true" || value === true)
  apellido: boolean
}