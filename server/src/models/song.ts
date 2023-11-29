import {Schema, model, Types} from "mongoose"

 export interface ISong {
    _id?: Types.ObjectId ;
     title: string;
     album:Types.ObjectId | string;
     songURL: string;
     genere: string[];
     artist: string[] | Types.ObjectId[];
     language: string;
     imageURL: string;
     lyrics?:string
   }

   const songSchema = new Schema<ISong>({
    title: {
      type: String,
      required: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album", // Reference to the Album model
      required: true,
    },
    songURL: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    genere: {
      type: [String],
      required: true,
    },
    artist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist", // Reference to the Album model
        required: true,
      }
    ],
    language: {
      type: String,
      required: true,
    },
    lyrics:{
      type: String,
    }
  });


  export const Song = model<ISong>("Song", songSchema)