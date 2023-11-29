// userSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import { IUser } from "../../models/user";

export interface IInitialUser {
  user: IUser | null;
  isLoading: boolean;
  registrationSuccess: boolean;
  loginSuccess: boolean;
  err: null | string;
  token: null | string;
  isAuthenticated:boolean
}

const initialState: IInitialUser = {
  user: null,
  isLoading: false,
  registrationSuccess: false,
  loginSuccess: false,
  err: null,
  token: null,
  isAuthenticated:false,
  
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset:(state)=>{
       state.registrationSuccess= false;
       state.loginSuccess = false;
    },
    setAcessToken: (state, action)=>{
      state.token = action.payload.accessToken
    },
    // Registration actions
    registerStart: (state, _action) => {
      state.isLoading = true;
      state.registrationSuccess = false;
      state.err = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.registrationSuccess = true;
      state.err = null;
    },
    registerError: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.registrationSuccess = false;
      state.err = action.payload;
    },

    // Login actions
    loginStart: (state, _action) => {
      state.isLoading = true;
      state.loginSuccess = false;
      state.err = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.loginSuccess = true;
      state.err = null;
      state.isAuthenticated = true;
    },
    loginError: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.loginSuccess = false;
      state.err = action.payload;
    },
    logOut:(state)=>{
      state.user = null;
      state.isLoading = false;
      state.registrationSuccess = false;
      state.loginSuccess = false;
      state.err = null;
      state.token = null;
      state.isAuthenticated =false;
    },

    favouriteArtist:(state, action)=>{
      const artistid = action.payload.artistId
      if(state.user?.favartist.includes(artistid)){
          //  founded so remove 
          state.user.favartist = state.user?.favartist.filter((fav)=> fav !== artistid)
      }else{
         state.user?.favartist.push(artistid)
      }
    },
    favouriteAlbum:(state, action)=>{
      const albumId = action.payload.artistId
      if(state.user?.favalbum.includes(albumId)){
          //  founded so remove 
          state.user.favalbum = state.user?.favalbum.filter((fav)=> fav !== albumId)
      }else{
         state.user?.favalbum.push(albumId)
      }
    }, favouriteSong:(state, action)=>{
      const songId = action.payload.songId
      if(state.user?.favsong.includes(songId)){
          //  founded so remove 
          state.user.favsong = state.user?.favsong.filter((fav)=> fav !== songId)
      }else{
         state.user?.favsong.push(songId)
      }
    }
  },
});

export const {
  registerStart,
  registerSuccess,
  registerError,
  loginStart,
  loginSuccess,
  loginError,
  reset,
  logOut,
  favouriteArtist,
  favouriteSong,
  favouriteAlbum,
  setAcessToken
} = userSlice.actions;

export default userSlice.reducer;
