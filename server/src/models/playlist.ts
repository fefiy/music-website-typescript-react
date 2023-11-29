import {Schema, model, Types, Document} from "mongoose"


export interface IPlayList {
  _id?: string;
  name: string;
  imageURL:string;
  songs: Types.ObjectId[] ;
  userId: Types.ObjectId | string;
  description?: string;
}


const playListSchema = new Schema<IPlayList>({
    name:{
        type:String,
        required:true
    },
    songs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Song"
        }
    ],
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    imageURL:{
        type:String,
        required:true 
    },
    description:{
        type:String
    }
})

export const PlayList = model<IPlayList>("PlayList", playListSchema)