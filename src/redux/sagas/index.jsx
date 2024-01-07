import { all, fork } from "redux-saga/effects";
import { watchGetUser } from "./user";
import { watchGetAllProducts } from "./products";

const rootSaga = function* () {
  yield all([
    fork(watchGetUser),
    fork(watchGetAllProducts),
    // Other forks
  ]);
};

export default rootSaga;
