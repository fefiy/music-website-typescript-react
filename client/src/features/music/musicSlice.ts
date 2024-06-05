import { createSlice } from "@reduxjs/toolkit";
import { song, songs } from "../../models/song";

// Define an initial state for authentication
const initialState:songs = {
  songs: [],
  isLoading: false,
  err: "",
  isMusicAddSuccesfuly:false,
  isMusicDelSuccesfuly:false
};

// Create an asynchronous thunk for user login

// Create the authentication slice with reducers and extra reducers
const musicSlice = createSlice({
  name: "songs",
  initialState: initialState,
  reducers: {
    reset:(state)=>{
      state.isMusicAddSuccesfuly = false;
      state.isLoading = false;
      state.isMusicDelSuccesfuly = false;
    },
    getMusic: (state) => {
      state.isLoading = true;
      state.err = "";
      
    },
    getMusicSuccess: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    getMusicErr: (state, action) => {
      state.err = action.payload.data;
      state.isLoading = false;
    },
    deleteMusic: (state, _action) => {
      state.isMusicDelSuccesfuly = false;
    },
    deleteMusicSuccess: (state, action) => {
      const songIdToDelete = action.payload;
      const songs:song[] = JSON.parse(JSON.stringify(state.songs));
      console.log("from delete" ,songs)
      console.log("songId To delete", songIdToDelete)
      state.songs = songs.filter((song) => song._id !== songIdToDelete);
      console.log(state.songs)
      state.isMusicDelSuccesfuly = true;
    },
    addMusic: (state, _action) => {
      state.isMusicAddSuccesfuly = false;
    },
    addMusicSuccess: (state, action) => {
      console.log(action.payload)
      const newSong = action.payload;
      state.isMusicAddSuccesfuly = true;
      state.songs = [...state.songs, newSong];
    },
    updateMusic: (state, _action) => {
      state.isLoading = false;
    },
    updateMusicSuccess: (state, action) => {
      state.isMusicAddSuccesfuly = true;
      const updatedSong = action.payload;
      console.log(updatedSong)
      state.songs = state.songs.map((song) =>
        song._id === updatedSong._id ? updatedSong : song
      );
    },
  },
});

export const {
  getMusic,
  getMusicErr,
  getMusicSuccess,
  deleteMusic,
  addMusic,
  updateMusic,
  reset,
  addMusicSuccess,
  updateMusicSuccess,
  deleteMusicSuccess
} = musicSlice.actions;

export default musicSlice.reducer;
