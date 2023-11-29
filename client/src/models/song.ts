import { IAlbum } from "../features/album/albumSlice";
import { IArtist } from "../features/artist/artistSlice";

export interface song {
  _id: string;
  title: string;
  album: IAlbum;
  songURL: string;
  genere: string[];
  artist: IArtist[];
  language: string;
  imageURL: string;
  lyrics?: string;
}

export interface songs {
  songs: song[];
  isLoading: boolean;
  err: string | null;
  isMusicAddSuccesfuly: boolean;
  isMusicDelSuccesfuly: boolean;
}

export interface play {
  songsToPlay: song[] | null;
  currentIndex: number;
  isPlaying: boolean;
  isActive: boolean;
  activeSong: song | null;
}

export interface activeSong {
  activeSong: song | null;
}
