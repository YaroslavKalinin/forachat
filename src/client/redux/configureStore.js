import {createStore, applyMiddleware, combineReducers, compose} from 'redux'; 
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import auth from './reducers/auth';
import socket from './reducers/socket';
import user from './reducers/user';
import signup from './reducers/signup';


const sagaMiddleware = createSagaMiddleware();
const configureStore = createStore(
    combineReducers({
        auth: auth,
        user: user,
        socket: socket,
        signup: signup
    }),
    {},
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
sagaMiddleware.run(rootSaga);

export default configureStore;
