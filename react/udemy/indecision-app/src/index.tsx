import 'normalize.css/normalize.css';
import './styles/styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp></IndecisionApp>, document.querySelector('#app'));
