import { createSlice} from '@reduxjs/toolkit';
import { play } from '../../models/song';


const initialState: play = {
  songsToPlay: null ,
  currentIndex: 0,
  isPlaying: false,
  isActive: false,
  activeSong:null
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    reset:(state)=>{
      state.activeSong = null;
      state.isPlaying = false;
      state.isActive = false;
    },
    setActiveSong: (state, action) => {
      const songtoneAddIndex = action.payload.data.findIndex((so: { _id: any; })=> so._id ==action.payload.song._id)
      state.activeSong = action.payload.song;
      if(songtoneAddIndex !== -1){
        state.currentIndex = songtoneAddIndex;
        console.log("songtoneAddIndex", songtoneAddIndex)
        console.log("song index is found")
      }
      state.songsToPlay = action.payload.data;
      console.log(action.payload.data)
      console.log(state.songsToPlay)
      state.isActive = true;
      state.isPlaying = true;
    },
    nextSong: (state) => {
      console.log("state.songsToPlay from next song", state.songsToPlay)
      if (state.songsToPlay && state.songsToPlay.length > 0) {
        const totalIndex = state.songsToPlay.length - 1;
        const songs = JSON.parse(JSON.stringify(state.songsToPlay));
        if (state.currentIndex === totalIndex) {
          state.activeSong = songs[0];
          state.currentIndex = 0;
        } else {
          state.activeSong = songs[state.currentIndex + 1];
          console.log("next song", songs[state.currentIndex + 1]);
          state.currentIndex += 1;
        }
        state.isActive = true;
      }
    },

    prevSong: (state) => {
      console.log("state.songsToPlay from prev song", state.songsToPlay)
      if (state.songsToPlay && state.songsToPlay.length > 0) {
        const totalIndex = state.songsToPlay.length - 1;
        console.log(state.songsToPlay)
        if (state.currentIndex === 0) {
          state.activeSong = state.songsToPlay[totalIndex];
          state.currentIndex = totalIndex;
        } else {
          state.activeSong = state.songsToPlay[state.currentIndex - 1];
          state.currentIndex -= 1;
        }
        state.isActive = true;
      }
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;
