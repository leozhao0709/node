import * as React from 'react';

interface IActionProps {
  hasOptions?: boolean;
  handlePick: () => void;
}

interface IActionState {
}

export default class Action extends React.Component<IActionProps, IActionState> {

  render() {
    return (
      <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should I do</button>
    );
  }
}
