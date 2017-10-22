import * as React from 'react';

interface IOptionProp {
  option: string;
  handleDeleteOption: (option: string) => void;
}

export default class Option extends React.Component<IOptionProp, {}> {

  handleDeleteOption = () => {
    this.props.handleDeleteOption(this.props.option);
  }

  render() {
    return (
      <div>
        {this.props.option}
        <button onClick={this.handleDeleteOption}>Remove</button>
      </div>
    );
  }
}
