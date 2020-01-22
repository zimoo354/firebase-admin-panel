import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import './index.css';
import App from './App';
import * as config from './config';
import * as serviceWorker from './serviceWorker';
import './utils/extend_prototypes';

Firebase.initializeApp(config.firebase)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
