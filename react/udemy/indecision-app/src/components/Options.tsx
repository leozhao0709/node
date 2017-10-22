import * as React from 'react';
import Option from './Option';

interface IOptionsProp {
  options: string[];
  onRemoveAll?: () => void;
  handleDeleteOption: (option: string) => void;
}

export default class Options extends React.Component<IOptionsProp, {}> {

  render() {
    return (
      <div>
        <button onClick={this.props.onRemoveAll}>Remove All</button>
        {this.props.options.length === 0 && <p>Please add an option to get started!</p>}
        {this.props.options.map((option) => <Option option={option} key={option} handleDeleteOption={this.props.handleDeleteOption} />)}
      </div>
    );
  }
}
