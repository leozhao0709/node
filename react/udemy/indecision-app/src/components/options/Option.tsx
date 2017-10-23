import * as React from 'react';
import './_option.scss';

interface IOptionProp {
  count?: number;
  option: string;
  handleDeleteOption: (option: string) => void;
}

export default class Option extends React.Component<IOptionProp, {}> {

  handleDeleteOption = () => {
    this.props.handleDeleteOption(this.props.option);
  }

  render() {
    return (
      <div className='option'>
        <p className='option__text'>
          {this.props.count ? `${this.props.count}. ${this.props.option}` : this.props.option}
        </p>
        <button className='button button--link' onClick={this.handleDeleteOption}>Remove</button>
      </div>
    );
  }
}
