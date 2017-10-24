import * as React from 'react';
import { BrowserRouter, Route, RouteComponentProps, Switch, Link, NavLink } from 'react-router-dom';
import Header from '../components/header/Header';
import ExpenseDashboardPage from '../components/dashboardPage/ExpenseDashboardPage';
import AddExpensePage from '../components/addExpensePage/AddExpensePage';
import EditExpensePage from '../components/editExpensePage/EditExpensePage';
import HelpPage from '../components/helpPage/HelpPage';
import NotFoundPage from '../components/notFountPage/NotFoundPage';


const AppRouter = (
  <BrowserRouter>
    <div>
      <Header></Header>
      <Switch>
        <Route path='/' component={ExpenseDashboardPage} exact={true}></Route>
        <Route path='/create' component={AddExpensePage} ></Route>
        <Route path='/edit/:id' component={EditExpensePage} ></Route>
        <Route path='/help' component={HelpPage} ></Route>
        <Route component={NotFoundPage} ></Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
