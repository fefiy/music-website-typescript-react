// userSaga.ts
import { takeLatest, put, } from 'redux-saga/effects';
import {
  registerSuccess,
  registerError,
  loginSuccess,
  loginError,
} from './userSlice'; // Import your actions
import { makeRequest } from '../../axios'; // Import your API functions or use axios directly

function* handleRegister(action: any):Generator {
  try {
    const response:any = yield makeRequest.post("/user/register", action.payload);
    yield put(registerSuccess(response?.data));
  } catch (error:any) {
    yield put(registerError(error?.message));
  }
}
function* handleLogin(action: any):Generator {
  try {
    const response: any = yield makeRequest.post("/user/login", action.payload);
    yield put(loginSuccess(response?.data));
  } catch (error:any) {
    yield put(loginError(error?.message));
  }
}

function* favouriteArtist(action: any):Generator {
  try {
    const {albumId, userId} = action.payload
   yield makeRequest.post(`/user/artist/${userId}/${albumId}`, action.payload);
  } catch (error:any) {
  }
}
function* favouriteSong(action: any):Generator {
  try {
    const {songId, userId} = action.payload
   yield makeRequest.post(`/user/song/${userId}/${songId}`, action.payload);
  } catch (error:any) {
  }
}
function* favouriteAlbum(action: any):Generator {
  try {
    const {albumId, userId} = action.payload
  yield makeRequest.post(`/user/album/${userId}/${albumId}`, action.payload);
  } catch (error:any) {
  }
}

export function* watchUserSaga(){
    yield takeLatest('user/registerStart', handleRegister);
    yield takeLatest('user/loginStart', handleLogin);
    yield takeLatest('user/favouriteArtist', favouriteArtist);
    yield takeLatest('user/favouriteSong', favouriteSong);
    yield takeLatest('user/favouriteAlbum', favouriteAlbum);
    
}
