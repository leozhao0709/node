import 'normalize.css/normalize.css';
import './styles/styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';



ReactDOM.render(AppRouter, document.querySelector('#app'));
