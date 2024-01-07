import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { getUserErrorAction, getUserSuccessAction } from "../reducers/users";
import { GET_USERS_BY_ID } from "../types";

// Generator function
function* getUserSaga({ payload: id }) {
  try {
    // You can also export the axios call as a function.
    const response = yield axios.get(`https://reqres.in/api/products/${id}`);
    yield put(getUserSuccessAction(response.data));
  } catch (error) {
    yield put(getUserErrorAction(error));
  }
}

// Generator function
export function* watchGetUser() {
  yield takeLatest(GET_USERS_BY_ID, getUserSaga);
}
