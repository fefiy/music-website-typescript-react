import { song } from "./song";

export interface IPlayList {
    _id?: string ;
    name: string;
    songs:  song[];
    userId:  string;
    imageURL:string;
    description?: string;
  }