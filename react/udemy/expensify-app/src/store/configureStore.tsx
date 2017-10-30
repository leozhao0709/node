import { createStore, combineReducers, Store } from 'redux';
import expensesReducer from '../reducers/expensesReducer';
import filtersReducer from '../reducers/filtersReducer';
import { IExpenseState } from '../actions/expenses/expensesTypes';
import { IFiltersState } from '../actions/filters/filtersTypes';


export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    })
  );
  return store;
};
