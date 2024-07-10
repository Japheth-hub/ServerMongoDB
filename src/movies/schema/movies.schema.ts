import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class Awards {
    wins?:        number;
    nominations?: number;
    text?:        string;
}

export class Imdb {
    rating?: number;
    votes?:  number;
    id?:     number;
}

export class Released {
    $date?: DateClass;
}

export class DateClass {
    $numberLong?: string;
}

export class Tomatoes {
    viewer?:      Viewer;
    lastUpdated?: LastUpdated;
}

export class LastUpdated {
    $date?: Date;
}

export class Viewer {
    rating?:     number;
    numReviews?: number;
    meter?:      number;
}

@Schema()
export class Movies {
    @Prop()
    plot: string;
    @Prop()
    genres: string[];
    @Prop()
    runtime: number;
    @Prop()
    cast: string[];
    @Prop()
    num_mflix_comments: number;
    @Prop()
    title: string;
    @Prop()
    poster: string;
    @Prop()
    fullplot: string;
    @Prop()
    languages: string[];
    @Prop()
    released: Released;
    @Prop()
    directors: string[];
    @Prop()
    rated: string;
    @Prop()
    awards: Awards;
    @Prop()
    lastupdated: Date;
    @Prop()
    year: number;
    @Prop()
    imdb: Imdb;
    @Prop()
    countries: string[];
    @Prop()
    type: string;
    @Prop()
    tomatoes: Tomatoes;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies)
