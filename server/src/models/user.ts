import {Schema, model, Types} from "mongoose"
export interface IUser {
    _id?:string,
    username:string,
    password:string,
    favsong: string[],
    favalbum: string[],
    favArtist:  string []
    role?:string
}

const userShema = new Schema<IUser>({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    role:{
        type:String,
        default:"user",
    },
    favalbum:[
        {
            type: Schema.Types.ObjectId,
            ref: "Album", // Reference to the Album model
        }
    ],
    favsong:[
        {
            type: Schema.Types.ObjectId,
            ref: "Song", // Reference to the Album model
        }
    ],
    favArtist:[
        {
            type: Schema.Types.ObjectId,
            ref: "Artist", // Reference to the Album model
        }
    ]
})

export const User = model<IUser>("User",userShema)