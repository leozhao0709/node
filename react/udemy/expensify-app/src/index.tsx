import 'normalize.css/normalize.css';
import './styles/styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses/expensesAction';
import { setFilterText } from './actions/filters/filtersAction';
import getVisibleExpenses from './selectors/expensesSelector';
import { IExpenseState } from './actions/expenses/expensesTypes';
import { IFiltersState } from './actions/filters/filtersTypes';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill' }));
store.dispatch(addExpense({ description: 'Gas bill' }));
store.dispatch(setFilterText('wa'));

const state: { expenses?: IExpenseState[], filters?: IFiltersState } = store.getState();
const visibleExpense = getVisibleExpenses(state.expenses!, state.filters!);
console.log(visibleExpense);

ReactDOM.render(AppRouter, document.querySelector('#app'));
