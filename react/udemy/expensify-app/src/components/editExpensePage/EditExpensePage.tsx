import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IEditExpensePageProps extends RouteComponentProps<any> {
}

interface IEditExpensePageState {
}

export default class EditExpensePage extends React.Component<IEditExpensePageProps, IEditExpensePageState> {

  state: IEditExpensePageState = {
  };

  render() {
    return (
      <div>
        Editing the expense with id of {this.props.match.params.id}
      </div>
    );
  }
}
