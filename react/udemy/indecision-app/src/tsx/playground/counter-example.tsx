import * as ReactDom from 'react-dom';
import * as React from 'react';

const appRoot = document.getElementById('app');

let count = 0;
const addOne = () => {
  count++;
  renderCountApp();
};

const minusOne = () => {
  count--;
  renderCountApp();
};

const reset = () => {
  count = 0;
  renderCountApp();
};

const renderCountApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  );

  ReactDom.render(templateTwo, appRoot);
};

renderCountApp();
