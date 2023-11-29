import {Schema, Types, model} from "mongoose"

export interface IArtist{
    _id?:string |  Types.ObjectId;
    imageURL:string;
    name:string;
    description?:string
}

const artistShema = new Schema<IArtist>({
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


export const Artist = model<IArtist>("Artist", artistShema)
