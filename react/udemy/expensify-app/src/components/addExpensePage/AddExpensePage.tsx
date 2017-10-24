import * as React from 'react';

interface IAddExpensePageProps {
}

interface IAddExpensePageState {
}

export default class AddExpensePage extends React.Component<IAddExpensePageProps, IAddExpensePageState> {

  static defaultProps: IAddExpensePageProps = {
  };

  state: IAddExpensePageState = {
  };

  render() {
    return (
      <div>
        This is from my add expense page
      </div>
    );
  }
}
