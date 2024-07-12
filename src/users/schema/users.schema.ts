import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose";

@Schema()
export class Users{
    @Prop()
    _id?: MongooseSchema.Types.ObjectId
    @Prop()
    name: string
    @Prop()
    email: string
    @Prop()
    password: string
    @Prop({type: [MongooseSchema.Types.ObjectId], ref: "movies"})
    favorites?: MongooseSchema.Types.ObjectId[]
    @Prop()
    movies?: MongooseSchema.Types.ObjectId[]
}

export const UsersSchema = SchemaFactory.createForClass(Users)