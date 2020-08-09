import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/AppComponent.js';
import store from './redux/configureStore';import { BrowserRouter as Router } from "react-router-dom"
import 'normalize.css';
import './style/style.scss';


render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
    , document.querySelector('#react-root'));