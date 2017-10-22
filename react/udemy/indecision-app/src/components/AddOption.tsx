import * as React from 'react';

interface IAddOptionProps {
  handleAddOption: (option: string) => void | string;
}

interface IAddOptionState {
  error: string | null;
}

export default class AddOption extends React.Component<IAddOptionProps, IAddOptionState> {

  state: IAddOptionState = {
    error: null
  };

  private handleAddOption = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const option = (e.currentTarget.elements as any).option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => {
      return {
        error
      };
    });

    if (!error) {
      (e.currentTarget.elements as any).option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type='text' name='option' />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
