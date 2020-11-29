import { call, put, takeLatest } from 'redux-saga/effects'
import { getData } from '../api';

import {
  FETCH_libraries_REQUEST,
  FETCH_libraries_SUCCESS,
  FETCH_libraries_FAILURE,
} from '../types';


function* fetchData() {
  try {
     const libraries = yield call(getData);
     yield put({type: FETCH_libraries_SUCCESS, payload: libraries});
  } catch (e) {
     yield put({type: FETCH_libraries_FAILURE, message: e.message});
  }
}

function* librariesaga() {
  yield takeLatest(FETCH_libraries_REQUEST, fetchData);
}

export default librariesaga;