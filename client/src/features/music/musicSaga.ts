import { put,  takeLatest, call } from "redux-saga/effects";
import { makeRequest } from "../../axios";
import { getMusicErr, getMusicSuccess, addMusicSuccess, updateMusicSuccess, deleteMusicSuccess } from "./musicSlice";
import { toast } from "react-toastify";

function* getMusics(): Generator {
  try {
    console.log("get music callded")
    // const response: AxiosResponse<song[]> = yield call(makeRequest.get, '/song/getAll');
    const response: any = yield makeRequest.get("/song/")
    console.log("get data", response)
    yield put(getMusicSuccess(response?.data));
  } catch (err:any) {
    yield put(getMusicErr(err?.response?.data));
  }
}

function* deleteMusicSaga(action: any) {
  try {
    const id = action.payload;
    yield makeRequest.delete(`/song/${id}`);
    yield put(deleteMusicSuccess(id));
  } catch (err) {
    toast.error("Error occur while deleting song")
    // Handle the error, dispatch an action, etc.
  }
}

function* addMusicSaga(action: any): Generator {
  try {
    
    const {data, privateAxios} = action.payload
    // const response: AxiosResponse<song> = yield call(makeRequest.post, "/song/save", newSongData);
    const response:any = yield call(privateAxios.post, "/song", data);
    console.log(response)
    yield put(addMusicSuccess(response.data));
  } catch (err) {
    toast.error("Error occur while Adding  song")
  }
}

function* updateMusicSaga(action: any): Generator {
  try {
    const {data, privateAxios, songid} = action.payload
    const updatedSongData = action.payload;
    console.log("from update sage", updatedSongData);
    const response: any= yield privateAxios.put(`/song/${songid}`, data);
    yield put(updateMusicSuccess(response.data));
  } catch (err) {
    console.log("err from saga",err)
    toast.error("Error occur while updating  song")
  }
}

export function* watchGetMusic() {
  yield takeLatest("songs/getMusic", getMusics);
}

export function* watchDeleteMusic() {
  yield takeLatest("songs/deleteMusic", deleteMusicSaga);
}

export function* watchAddMusic() {
  yield takeLatest("songs/addMusic", addMusicSaga);
}

export function* watchUpdateMusic() {
  yield takeLatest("songs/updateMusic", updateMusicSaga);
}
