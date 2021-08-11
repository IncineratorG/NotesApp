import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppReducers from './reducers/AppReducers';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  notes: AppReducers.notes,
  categories: AppReducers.categories,
  appSettings: AppReducers.appSettings,
  share: AppReducers.share,
  backup: AppReducers.backup,
  vault: AppReducers.vault,
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
