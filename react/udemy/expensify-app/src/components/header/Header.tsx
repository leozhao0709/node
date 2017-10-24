import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface IHeaderProps {
}

interface IHeaderState {
}
export default class Header extends React.Component<IHeaderProps, IHeaderState> {

  static defaultProps: IHeaderProps = {
  };

  state: IHeaderState = {
  };

  render() {
    return (
      <header>
        <h1>Expensify</h1>
        <NavLink to='/' activeClassName='is-active' exact={true}>Dashboard</NavLink>
        <NavLink to='/create' activeClassName='is-active'>Create Expense</NavLink>
        {/*<NavLink to='/edit' activeClassName='is-active'>Edit Expense</NavLink>*/}
        <NavLink to='/help' activeClassName='is-active'>Help</NavLink>
      </header>
    );
  }
}
