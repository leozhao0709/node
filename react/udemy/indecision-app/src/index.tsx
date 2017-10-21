import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IIndecisionAppProps {

}
interface IIndecisionAppState {
  options: string[],
}

class IndecisionApp extends React.Component<IIndecisionAppProps, IIndecisionAppState> {
  constructor(props: IIndecisionAppProps) {
    super(props);
    this.state = {
      options: ['one', 'two', 'Three'],
    }
  };

  onRemoveAll() {
    this.setState(() => {
      return {
        options: [],
      }
    })
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option: string): string | void {
    if (!option) {
      return 'Enter valid value to add item';
    }

    if (this.state.options.indexOf(option) != -1) {
      return 'This option already exists';
    }

    this.setState((prevState: IIndecisionAppState): IIndecisionAppState => {
      return {
        options: prevState.options.concat([option])
      }
    })
  }

  render() {
    const title = 'Indescision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle}></Header>
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick.bind(this)}></Action>
        <Options options={this.state.options} onRemoveAll={this.onRemoveAll.bind(this)}></Options>
        <AddOption handleAddOption={this.handleAddOption.bind(this)}></AddOption>
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

interface IActionProps {
  hasOptions?: boolean,
  handlePick: () => void,
}

interface IActionState {
}
class Action extends React.Component<IActionProps, IActionState> {
  constructor(props: IActionProps) {
    super(props);
  }
  render() {
    return (
      <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should I do</button>
    );
  }
}


interface IOptionsProp {
  options: string[];
  onRemoveAll?: () => void;
}

class Options extends React.Component<IOptionsProp, {}> {
  constructor() {
    super();
  };

  render() {
    return (
      <div>
        <button onClick={this.props.onRemoveAll}>Remove All</button>
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


interface IAddOptionProps {
  handleAddOption: (option: string) => void | string
}

interface IAddOptionState {
  error: string | null;
}
class AddOption extends React.Component<IAddOptionProps, IAddOptionState> {
  constructor(props: IAddOptionProps) {
    super(props);
    this.state = {
      error: null,
    }
  }

  handleAddOption(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const option = (e.currentTarget.elements as any).option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => {
      return {
        error
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption.bind(this)}>
          <input type='text' name='option' />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp></IndecisionApp>, document.querySelector('#app'));
