// artistSaga.ts
import { takeLatest, put} from 'redux-saga/effects';
import {
  fetchArtistsSuccess,
  fetchArtistsError,
  addArtistSuccess,
  addArtistError,
  deleteArtistSuccess,
  deleteArtistError,
  updateArtistSuccess,
  updateArtistError,
} from './artistSlice'; // Import your actions
import {makeRequest} from '../../axios'; // Import your API functions or use axios directly

function* handleFetchArtists():Generator {
  try {
    // yield put(fetchArtistsStart())
    const response:any = yield makeRequest.get("/artist");
    console.log(response) // Replace with your actual API call
    yield put(fetchArtistsSuccess(response?.data));
  } catch (error:any) {
    yield put(fetchArtistsError(error?.message));
  }
}

function* handleAddArtist(action: any):Generator {
  try {
    // yield put(addArtistStart());
   
    const response:any = yield makeRequest.post("/artist", action.payload); // Replace with your actual API call
    yield put(addArtistSuccess(response.data));
  } catch (error:any) {
    yield put(addArtistError(error.message));
  }
}

function* handleDeleteArtist(action: any):Generator {
  try {
    // yield put(deleteArtistStart());
    const delete_id = action.payload
    const response:any = yield makeRequest.delete("/artist/"+delete_id) // Replace with your actual API call
    yield put(deleteArtistSuccess(response.data._id));
  } catch (error:any) {
    yield put(deleteArtistError(error.message));
  }
}

function* handleUpdateArtist(action: any):Generator {
  try {
    const updpated_id = action.payload.id
    // yield put(updateArtistStart());
    const response: any = yield makeRequest.put("/artist/"+updpated_id, action.payload.data); // Replace with your actual API call
    yield put(updateArtistSuccess(response.data));
  } catch (error:any) {
    yield put(updateArtistError(error.message));
  }
}

// Watcher saga
export function* artistSaga() {
  yield takeLatest('artist/fetchArtistsStart', handleFetchArtists);
  yield takeLatest('artist/addArtistStart', handleAddArtist);
  yield takeLatest('artist/deleteArtistStart', handleDeleteArtist);
  yield takeLatest('artist/updateArtistStart', handleUpdateArtist);
}
