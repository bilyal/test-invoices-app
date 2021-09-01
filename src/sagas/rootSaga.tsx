import {retrieveCustomers, retrieveProducts} from '../services/ItemService'
import { put, call, takeEvery, all } from 'redux-saga/effects'

export function* fetchCustomers() {
    try {
        const data = yield call(retrieveCustomers)
        yield put({type: "FETCH_CUSTOMERS_SUCCEEDED", payload: data})
     } catch (error) {
        yield put({type: "FETCH_CUSTOMERS_FAILED", payload: error})
     }

}

export function* fetchProducts() {
    try {
        const data = yield call(retrieveProducts)
        yield put({type: "FETCH_PRODUCTS_SUCCEEDED", payload: data})
     } catch (error) {
        yield put({type: "FETCH_PRODUCTS_FAILED", payload: error})
     }

}

function* watchFetchCustomers() {
    yield takeEvery ('FETCH_CUSTOMERS', fetchCustomers);
}

function* watchFetchProducts() {
    yield takeEvery ('FETCH_PRODUCTS', fetchProducts);
}

export default function* rootSaga() {
    yield all ([
        watchFetchCustomers(),
        watchFetchProducts()
    ]);
  }