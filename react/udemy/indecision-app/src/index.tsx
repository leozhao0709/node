import * as React from 'react';
import * as ReactDOM from 'react-dom';

class IndecisionApp extends React.Component {
  render() {
    const title = 'Indescision';
    const subtitle = 'Put your life in the hands of a computer';
    const options = ['one', 'two', 'Three'];

    return (
      <div>
        <Header title={title} subtitle={subtitle}></Header>
        <Action></Action>
        <Options options={options}></Options>
        <AddOption></AddOption>
      </div>
    );
  }
}


interface HeaderProps {
  title: string;
  subtitle: string;
}
class Header extends React.Component<HeaderProps, {}> {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle
        }</h2>
      </div>
    );
  }
}


class Action extends React.Component {
  render() {
    return (
      <button>What should I do</button>
    );
  }
}

interface OptionsProp {
  options: string[];
}
class Options extends React.Component<OptionsProp, {}> {
  onRemoveAll() {
    alert('Remove all');
  }
  render() {
    return (
      <div>
        <button onClick={this.onRemoveAll}>Remove All</button>
        {this.props.options.map((option) => <Option option={option} key={option} />)}
      </div>
    );
  }
}

interface OptionProp {
  option: string;
}
class Option extends React.Component<OptionProp, {}> {
  render() {
    return (
      <div>
        {this.props.option}
      </div>
    );
  }
}


class AddOption extends React.Component {
  render() {
    return (
      <div>
        <form>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp></IndecisionApp>, document.querySelector('#app'));
