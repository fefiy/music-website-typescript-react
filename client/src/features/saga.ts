import { all, fork } from "redux-saga/effects";
import { watchGetMusic, watchAddMusic ,watchDeleteMusic, watchUpdateMusic} from "./music/musicSaga";
import { watchUserSaga} from "./user/userSaga";
import { albumSaga } from "./album/albumSag";
import { artistSaga } from "./artist/artistSaga";
import { playliSaga } from "./playlist/PlayListSaga";
const rootSaga = function* () {
  yield all([
    fork(watchGetMusic),
    fork(watchAddMusic),
    fork(watchDeleteMusic),
    fork(watchUpdateMusic),
    fork(watchUserSaga),
    fork(albumSaga),
    fork(artistSaga),
    fork(playliSaga)
  ]);
};

export default rootSaga;
