// albumSaga.ts
import { takeLatest, put} from 'redux-saga/effects';
import {
  fetchalbumsSuccess,
  fetchalbumsError,
  addalbumSuccess,
  addalbumError,
  deletealbumSuccess,
  deletealbumError,
  updatealbumSuccess,
  updatealbumError,
} from './albumSlice'; // Import your actions
import {makeRequest} from '../../axios'; // Import your API functions or use axios directly

function* handleFetchalbums():Generator {
  try {
    // yield put(fetchalbumsStart());

    const response:any = yield makeRequest.get("/album"); // Replace with your actual API call
    yield put(fetchalbumsSuccess(response?.data));
  } catch (error:any) {
    yield put(fetchalbumsError(error?.message));
  }
}

function* handleAddalbum(action: any):Generator {
  try {
    // yield put(addalbumStart());
    const response:any = yield makeRequest.post("/album", action.payload); // Replace with your actual API call
    yield put(addalbumSuccess(response.data));
  } catch (error:any) {
    yield put(addalbumError(error.message));
  }
}

function* handleDeletealbum(action: any):Generator {
  try {
    // yield put(deletealbumStart());
    const delete_id = action.payload
    const response:any = yield makeRequest.delete("/album/"+delete_id) // Replace with your actual API call
    yield put(deletealbumSuccess(response.data._id));
  } catch (error:any) {
    yield put(deletealbumError(error.message));
  }
}

function* handleUpdatealbum(action: any):Generator {
  try {
    const updpated_id = action.payload.id
    // yield put(updatealbumStart());
    const response: any = yield makeRequest.put("/album/"+updpated_id, action.payload.data); // Replace with your actual API call
    yield put(updatealbumSuccess(response.data));
  } catch (error:any) {
    yield put(updatealbumError(error.message));
  }
}

// Watcher saga
export function* albumSaga() {
  yield takeLatest('album/fetchalbumsStart', handleFetchalbums);
  yield takeLatest('album/addalbumStart', handleAddalbum);
  yield takeLatest('album/deletealbumStart', handleDeletealbum);
  yield takeLatest('album/updatealbumStart', handleUpdatealbum);
}
