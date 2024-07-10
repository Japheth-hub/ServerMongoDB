import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comments{
    @Prop()
    name: string
    @Prop()
    email: string 
    @Prop()
    movie_id: string
    @Prop()
    text:string
    @Prop()
    date: Date
}

export const CommentsSchema = SchemaFactory.createForClass(Comments)