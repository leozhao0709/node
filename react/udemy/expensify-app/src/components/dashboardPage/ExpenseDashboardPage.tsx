import * as React from 'react';

interface IExpenseDashboardPageProps {
}

interface IExpenseDashboardPageState {
}
export default class ExpenseDashboardPage extends React.Component<IExpenseDashboardPageProps, IExpenseDashboardPageState> {

  static defaultProps: IExpenseDashboardPageProps = {
  };

  state: IExpenseDashboardPageState = {
  };

  render() {
    return (
      <div>
        This is from my dashboard component
      </div>
    );
  }
}
