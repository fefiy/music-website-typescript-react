// playlistSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { IPlayList } from "../../models/playlist";

interface IInitialState {
  playlists: IPlayList[];
  isLoading: boolean;
  isPlaylostaddSuccefully: boolean;
  err: null | string;
  isPlaylostDeleteSuccefully: boolean;

}

const initialState: IInitialState = {
  playlists: [],
  isLoading: false,
  err: null,
  isPlaylostaddSuccefully: false,
  isPlaylostDeleteSuccefully: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.isPlaylostaddSuccefully = false;
      state.isLoading = false;
    },
    getPlaylistsByUserStart(state, _action) {
      state.isLoading = true;
      state.err = null;
    },
    getPlaylistsByUserSuccess(state, action) {
      state.playlists = action.payload;
      state.isLoading = false;
    },
    getPlaylistsByUserError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },
    createPlaylistStart(state, _action) {
      state.isLoading = true;
      state.err = null;
    },
    createPlaylistSuccess(state, action) {
      state.playlists.push(action.payload);
      state.isLoading = false;
      state.isPlaylostaddSuccefully = true;
    },
    createPlaylistError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },
    // Add similar actions for update, delete, and addSong
    addSongToPlaylistStart(state, _action) {
      state.isLoading = true;
      state.err = null;
    },
    addSongToPlaylistSuccess(state, action) {
      //  Update state accordingly
      console.log(action.payload.playlistId);
      const updateplaylist = state.playlists.find(
        (pl) => pl._id === action.payload.playlistId
      );
      console.log("update playlist ", updateplaylist);
      updateplaylist?.songs.push(action.payload.data);
      state.isLoading = false;
    },
    addSongToPlaylistError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },

    removeSongFromPlaylistStart(state, _action) {
      state.isLoading = true;
      state.err = null;
    },
    removeSongFromPlaylistSuccess(state, action) {
      const playListId = action.payload.playlistId;
      const songId = action.payload.songId;
      const updateplaylist = state.playlists.find(
        (pl) => pl._id === playListId
      );
      if (updateplaylist) {
        // If the playlist is found
        updateplaylist.songs = updateplaylist.songs.filter(
          (song) => song._id !== songId
        );
      }
    },
    removeSongFromPlaylistError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },
    deletePlaylistStart(state, _action) {
      state.isLoading = true;
      state.err = null;
    },
    deletePlaylistSuccess(state, action) {
      const playlistId = action.payload;
      state.isPlaylostDeleteSuccefully =  true;
      const stateplaylists = JSON.parse(JSON.stringify(state.playlists))
      console.log("playlist from delete playlist", state.playlists)
      state.playlists = stateplaylists.filter(pl => pl._id !== playlistId)
    },
    deletePlaylistError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {
  createPlaylistStart,
  createPlaylistSuccess,
  createPlaylistError,
  addSongToPlaylistStart,
  addSongToPlaylistSuccess,
  addSongToPlaylistError,
  removeSongFromPlaylistStart,
  removeSongFromPlaylistSuccess,
  removeSongFromPlaylistError,
  deletePlaylistStart,
  deletePlaylistSuccess,
  deletePlaylistError,
  getPlaylistsByUserStart,
  getPlaylistsByUserSuccess,
  getPlaylistsByUserError,
  reset,
} = playlistSlice.actions;

export default playlistSlice.reducer;
