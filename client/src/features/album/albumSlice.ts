
import { createSlice} from "@reduxjs/toolkit";

export interface IAlbum{
    _id?:string;
    imageURL:string;
    name:string;
    description?:string
}

interface IInitialState {
  albums: IAlbum[];
  isLoading: boolean;
  isAlbumAddSuccefully:boolean;

  err: null | string;
}

const initialState: IInitialState = {
  albums: [],
  isLoading: false,
  isAlbumAddSuccefully:false,
  err: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState: initialState,
  reducers: {
    fetchalbumsStart: (state) => {
      state.isLoading = true;
      state.err = null;
    },
    fetchalbumsSuccess: (state, action) => {
      state.albums = action.payload;
      state.isLoading = false;
    },
    fetchalbumsError: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    addalbumStart: (state, _action) => {
      state.isLoading = true;
      state.err = null;
    },
    addalbumSuccess: (state, action) => {
      state.albums.push(action.payload);
      state.isLoading = false;
      state.isAlbumAddSuccefully = true
    },
    addalbumError: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    deletealbumStart: (state) => {
      state.isLoading = true;
      state.err = null;
    },
    deletealbumSuccess: (state, action) => {
      state.albums = state.albums.filter((album) => album._id !== action.payload);
      state.isLoading = false;
    },
    deletealbumError: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    updatealbumStart: (state) => {
      state.isLoading = true;
      state.err = null;
    },
    updatealbumSuccess: (state, action) => {
      const updatedalbum = action.payload;
      state.albums = state.albums.map((album) =>
        album._id === updatedalbum._id ? updatedalbum : album
      );
      state.isLoading = false;
    },
    updatealbumError: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {
  fetchalbumsStart,
  fetchalbumsSuccess,
  fetchalbumsError,
  addalbumStart,
  addalbumSuccess,
  addalbumError,
  deletealbumStart,
  deletealbumSuccess,
  deletealbumError,
  updatealbumStart,
  updatealbumSuccess,
  updatealbumError,
} = albumSlice.actions;

export default albumSlice.reducer;


