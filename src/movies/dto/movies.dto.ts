import { Field, InputType, ObjectType } from "@nestjs/graphql";

export interface Moviesdto {
  _id?: ID;
  plot?: string;
  genres?: string[];
  runtime?: number;
  cast?: string[];
  num_mflix_comments?: number;
  title?: string;
  fullplot?: string;
  languages?: string[];
  released?: Released;
  directors?: string[];
  rated?: string;
  awards?: Awards;
  lastupdated?: Date;
  year?: number;
  imdb?: Imdb;
  countries?: string[];
  type?: string;
  tomatoes?: Tomatoes;
}

export interface ID {
  $oid?: string;
}

export interface Awards {
  wins?: number;
  nominations?: number;
  text?: string;
}

export interface Imdb {
  rating?: number;
  votes?: number;
  id?: number;
}

export interface Released {
  $date?: DateClass;
}

export interface DateClass {
  $numberLong?: string;
}

export interface Tomatoes {
  viewer?: Viewer;
  lastUpdated?: LastUpdated;
}

export interface LastUpdated {
  $date?: Date;
}

export interface Viewer {
  rating?: number;
  numReviews?: number;
  meter?: number;
}
@InputType()
export class Genres {
  @Field(() => [String], {nullable: true, description: ""})
  genres: string[];
  @Field(() => Number, {nullable: true, description: ""})
  skip: number;
  @Field(() => Number, {nullable: true, description: ""})
  limit?: number;
}

export class Languages {
  languages: string[];
  skip: number;
  limit?: number;
}

export class Time {
  time: number;
  skip: number;
  limit: number;
}
