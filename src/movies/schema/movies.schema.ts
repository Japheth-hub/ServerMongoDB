import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@ObjectType()
export class Awards {
  @Field({nullable: true, description: ""})
  wins?: number;
  @Field({nullable: true, description: ""})
  nominations?: number;
  @Field({nullable: true, description: ""})
  text?: string;
}
@ObjectType()
export class Imdb {
  @Field({nullable: true, description: ""})
  rating?: number;
  @Field({nullable: true, description: ""})
  votes?: number;
  @Field({nullable: true, description: ""})
  id?: number;
}

@ObjectType()
export class DateClass {
  @Field({nullable: true, description: ""})
  numberLong?: string;
}

@ObjectType()
export class Released {
  @Field({nullable: true, description: ""})
  date?: DateClass;
}

@ObjectType()
export class Viewer {
  @Field({nullable: true, description: ""})
  rating?: number;
  @Field({nullable: true, description: ""})
  numReviews?: number;
  @Field({nullable: true, description: ""})
  meter?: number;
}

@ObjectType()
export class LastUpdated {
  @Field({nullable: true, description: ""})
  date?: Date;
}

@ObjectType()
export class Tomatoes {
  @Field({nullable: true, description: ""})
  viewer?: Viewer;
  @Field({nullable: true, description: ""})
  lastUpdated?: LastUpdated;
}

@Schema()
@ObjectType()
export class Movies {
  @Prop()
  @Field(() => String, {
    nullable: true,
    description: 'Descripcion de la peliucla',
  })
  plot: string;
  @Prop()
  @Field(() => [String], {
    nullable: true,
    description: 'Generos de la pelicula',
  })
  genres: string[];
  @Prop()
  @Field(() => Number, { nullable: true, description: 'Tiempo' })
  runtime: number;
  @Prop()
  @Field(() => [String], { nullable: true, description: 'Casting' })
  cast: string[];
  @Prop()
  @Field(() => Number, { nullable: true, description: 'Comentarios' })
  num_mflix_comments: number;
  @Prop()
  @Field(() => String, { nullable: true, description: 'Titulo' })
  title: string;
  @Prop()
  @Field(() => String, { nullable: true, description: 'Poster url' })
  poster: string;
  @Prop()
  @Field(() => String, { nullable: true, description: 'Descripcion completa' })
  fullplot: string;
  @Prop()
  @Field(() => [String], { nullable: true, description: 'Idiomas' })
  languages: string[];
  @Prop()
  @Field(() => Released, { nullable: true, description: 'Relaised' })
  released: Released;
  @Prop()
  @Field(() => [String], { nullable: true, description: 'Directores' })
  directors: string[];
  @Prop()
  @Field(() => String, { nullable: true, description: 'Raiting' })
  rated: string;
  @Prop()
  @Field(() => Awards, { nullable: true, description: 'Awards' })
  awards: Awards;
  @Prop()
  @Field(() => Date, { nullable: true, description: 'Fecha de publicacion' })
  lastupdated: Date;
  @Prop()
  @Field(() => String, { nullable: true, description: 'Año' })
  year: number;
  @Prop()
  @Field(() => Imdb, { nullable: true, description: 'imdb' })
  imdb: Imdb;
  @Prop()
  @Field(() => [String], { nullable: true, description: 'Paises' })
  countries: string[];
  @Prop()
  @Field(() => String, { nullable: true, description: 'Typo' })
  type: string;
  @Prop()
  @Field(() => Tomatoes, { nullable: true, description: 'Tomates' })
  tomatoes?: Tomatoes;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
