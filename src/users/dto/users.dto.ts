import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class crearUser{
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
}

export class updateUser{
    @IsString()
    @IsOptional()
    name?: string
    @IsString()
    @IsOptional()
    email?: string
    @IsString()
    @IsOptional()
    password?: string
}