import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import musicSlice from "./music/musicSlice";
import playerSlice from "./play/playerSlice";
import rootSaga from "./saga";
import userSlice from "./user/userSlice";
import artistSlice from "./artist/artistSlice";
import albumSlice from "./album/albumSlice";
import PlayListSlice from "./playlist/PlayListSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["songs", "user", "playlist", "player"],
};

const rootReducer = combineReducers({
  songs: musicSlice,
  player: playerSlice,
  user: userSlice,
  artist: artistSlice,
  album: albumSlice,
  playlist: PlayListSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);












