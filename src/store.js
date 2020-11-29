import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import { reducer } from './reducers';
import librariesaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ),
);

sagaMiddleware.run(librariesaga)

export default store;