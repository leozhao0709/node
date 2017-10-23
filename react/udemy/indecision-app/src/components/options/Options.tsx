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
        <div className='widget-header'>
          <h3 className='widget-header__title'>Your Options</h3>
          <button onClick={this.props.onRemoveAll} className='button button--link'>Remove All</button>
        </div>
        {this.props.options.length === 0 && <p className='widget__message'>Please add an option to get started!</p>}
        {this.props.options.map((option, index: number) => {
          return <Option count={index + 1} option={option} key={option} handleDeleteOption={this.props.handleDeleteOption} />;
        })
        }
      </div>
    );
  }
}
