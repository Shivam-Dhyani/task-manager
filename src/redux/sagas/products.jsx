import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { GET_ALL_PRODUCTS } from "../types";
import {
  getProductsErrorAction,
  getProductsSuccessAction,
} from "../reducers/products";
import { baseUrl } from "../../utils/common";
import { creatorAPI } from "../apis/creator";

// Generator function
function* getProductsSaga(payload) {
  console.log("baseURL====>", baseUrl);
  try {
    // You can also export the axios call as a function.
    const response = yield axios.post(
      // `https://efcd1da7286a4a20998f6be68b5236ea.api.mockbin.io/`
      `${baseUrl}${creatorAPI.addCreator}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
          // Add any other headers if needed
        },
      }
    );
    yield put(getProductsSuccessAction(response.data));
  } catch (error) {
    yield put(getProductsErrorAction(error));
  }
}

// Generator function
export function* watchGetAllProducts() {
  yield takeLatest(GET_ALL_PRODUCTS, getProductsSaga);
}
