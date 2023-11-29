

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IArtist{
    _id:string;
    imageURL:string;
    name:string;
    description?:string
}

interface IInitialState {
  artists: IArtist[];
  isLoading: boolean;
  isArtistAddSuccesfuly:boolean;
  err: null | string;
}

const initialState: IInitialState = {
  artists: [],
  isLoading: false,
  err: null,
  isArtistAddSuccesfuly:false
};

const artistSlice = createSlice({
  name: "artist",
  initialState: initialState,
  reducers: {
    fetchArtistsStart: (state) => {
      state.isLoading = true;
      state.err = null;
    },
    fetchArtistsSuccess: (state, action) => {
      state.artists = action.payload;
      state.isLoading = false;
    },
    fetchArtistsError: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    addArtistStart: (state, _action) => {
      state.isLoading = true;
      state.err = null;
    },
    addArtistSuccess: (state, action: PayloadAction<IArtist>) => {
      state.artists.push(action.payload);
      state.isArtistAddSuccesfuly = true
      state.isLoading = false;
    },
    addArtistError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    deleteArtistStart: (state) => {
      state.isLoading = true;
      state.err = null;
    },
    deleteArtistSuccess: (state, action: PayloadAction<string>) => {
      state.artists = state.artists.filter((artist) => artist._id !== action.payload);
      state.isLoading = false;
    },
    deleteArtistError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    updateArtistStart: (state) => {
      state.isLoading = true;
      state.err = null;
    },
    updateArtistSuccess: (state, action: PayloadAction<IArtist>) => {
      const updatedArtist = action.payload;
      state.artists = state.artists.map((artist) =>
        artist._id === updatedArtist._id ? updatedArtist : artist
      );
      state.isLoading = false;
    },
    updateArtistError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {
  fetchArtistsStart,
  fetchArtistsSuccess,
  fetchArtistsError,
  addArtistStart,
  addArtistSuccess,
  addArtistError,
  deleteArtistStart,
  deleteArtistSuccess,
  deleteArtistError,
  updateArtistStart,
  updateArtistSuccess,
  updateArtistError,
} = artistSlice.actions;

export default artistSlice.reducer;


