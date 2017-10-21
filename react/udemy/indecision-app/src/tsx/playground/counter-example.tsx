import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ICounterProps {
}

interface ICounterState {
  count: number;
}

class Counter extends React.Component<ICounterProps, ICounterState> {
  constructor(prop: ICounterProps) {
    super(prop);
    this.state = {
      count: 0,
    }
  };

  handleAdd() {
    this.setState((prevState: ICounterState, props: ICounterProps) => {
      return {
        count: prevState.count + 1
      }
    })
  }

  handleMinus() {
    this.setState((prevState: ICounterState, props: ICounterProps) => {
      return {
        count: prevState.count - 1
      }
    })
  }

  handleReset() {
    this.setState((prevState: ICounterState, props: ICounterProps) => {
      return {
        count: 0
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAdd.bind(this)}>+1</button>
        <button onClick={this.handleMinus.bind(this)}>-1</button>
        <button onClick={this.handleReset.bind(this)}>Reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.querySelector('#app'));

// import * as ReactDom from 'react-dom';
// import * as React from 'react';

// const appRoot = document.getElementById('app');

// let count = 0;
// const addOne = () => {
//   count++;
//   renderCountApp();
// };

// const minusOne = () => {
//   count--;
//   renderCountApp();
// };

// const reset = () => {
//   count = 0;
//   renderCountApp();
// };

// const renderCountApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   );

//   ReactDom.render(templateTwo, appRoot);
// };

// renderCountApp();
