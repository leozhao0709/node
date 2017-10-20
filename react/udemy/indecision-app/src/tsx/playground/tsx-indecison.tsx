import * as React from 'react';
import * as ReactDOM from 'react-dom';

const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: [] as string[],
}

const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const option = (e.currentTarget.elements as any).option.value;

  if (option) {
    app.options.push(option);
    (e.currentTarget.elements as any).option.value = '';
    renderApp();
  }
};

const onRemoveAll = () => {
  app.options = [];
  renderApp();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAll}>Remove All</button>
      <ol>
        {
          app.options.map((option: string) => {
            return <li key={option}>{option}</li>;
          })
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type='text' name='option' />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

renderApp();
