import {createStore, applyMiddleware, combineReducers, compose} from 'redux'; 
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import user from './reducers/user';


const sagaMiddleware = createSagaMiddleware();
const configureStore = createStore(
    combineReducers({
        user: user
    }),
    {},
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
sagaMiddleware.run(rootSaga);

export default configureStore;
