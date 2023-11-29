import {Schema, model} from "mongoose"

export interface IAlbum{
    _id?:string;
    imageURL:string;
    name:string;
    description?:string
}

const albumShema = new Schema<IAlbum>({
    imageURL:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
})

export const Album = model<IAlbum>("Album", albumShema)
