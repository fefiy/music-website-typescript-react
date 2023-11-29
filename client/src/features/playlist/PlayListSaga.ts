// playlistaga.ts
import { takeLatest, put } from "redux-saga/effects";
import {
  getPlaylistsByUserError,
  createPlaylistError,
  createPlaylistSuccess,
  addSongToPlaylistSuccess,
  addSongToPlaylistError,
  removeSongFromPlaylistSuccess,
  removeSongFromPlaylistError,
  deletePlaylistError,
  getPlaylistsByUserSuccess,
  deletePlaylistSuccess,
} from "./PlayListSlice"; // Import your actions
import { makeRequest } from "../../axios"; // Import your API functions or use axios directly

function* handleFetchplaylist(action: any): Generator {
  try {
    const response: any = yield makeRequest.get(
      "/playlist/user/" + action.payload
    );
    console.log("palylist", response);
    yield put(getPlaylistsByUserSuccess(response?.data));
  } catch (error: any) {
    yield put(getPlaylistsByUserError(error?.message));
  }
}
function* handleAddplaylist(action: any): Generator {
  try {
    const response: any = yield makeRequest.post(
      `/playlist`,
      action.payload
    ); // Replace with your actual API call
    yield put(createPlaylistSuccess(response.data));
  } catch (error: any) {
    yield put(createPlaylistError(error.message));
  }
}
function* handleAddsongToPlaylist(action: any): Generator {
  try {
    // yield put(deleteplaylisttart());
    console.log("atiop paylod from saga handle add song to playlist", action.payload);
    const songId = action.payload.songId;
    const playlistId = action.payload.playlistId;
    console.log(songId, playlistId);
    const response: any = yield makeRequest.post(
      `/playlist/song/${songId}/${playlistId}`,
      action.payload
    ); // Replace with your actual API call
    yield put(addSongToPlaylistSuccess({data:response.data, playlistId}));
  } catch (error: any) {
    yield put(addSongToPlaylistError(error.message));
  }
}
function* handleMinussongToPlaylist(action: any): Generator {
  try {
    // yield put(deleteplaylisttart());
    const { playlistId, songId } = action.payload;
  yield makeRequest.delete(
        `/playlist/song/${songId}/${playlistId}`
    ); // Replace with your actual API call
    yield put(removeSongFromPlaylistSuccess({songId, playlistId}));
  } catch (error: any) {
    yield put(removeSongFromPlaylistError(error.message));
  }
}

function* handleDeletePlaylist(action: any): Generator {
  try {
    // yield put(updateplaylisttart());
    const response: any = yield makeRequest.delete(
      "/playlist/" + action.payload
    ); // Replace with your actual API call
    yield put(deletePlaylistSuccess(response.data));
  } catch (error: any) {
    yield put(deletePlaylistError(error.message));
  }
}

// Watcher saga
export function* playliSaga() {
  yield takeLatest("playlist/createPlaylistStart", handleAddplaylist);
  yield takeLatest("playlist/getPlaylistsByUserStart", handleFetchplaylist);
  yield takeLatest("playlist/addSongToPlaylistStart", handleAddsongToPlaylist);
  yield takeLatest(
    "playlist/removeSongFromPlaylistStart",
    handleMinussongToPlaylist
  );
  yield takeLatest("playlist/deletePlaylistStart", handleDeletePlaylist);
}
