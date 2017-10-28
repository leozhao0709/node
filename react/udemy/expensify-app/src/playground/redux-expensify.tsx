import { createStore, combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';

enum ExpensifyType {
  ADD_EXPENSE = 'ADD_EXPENSE',
  REMOVE_EXPENSE = 'REMOVE_EXPENSE',
  EDIT_EXPENSE = 'EDIT_EXPENSE',
  SET_TEXT_FILTER = 'SET_TEXT_FILTER',
  SORT_BY_DATE = 'SORT_BY_DATE',
  SORT_BY_AMOUNT = 'SORT_BY_AMOUNT',
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE'
}

interface AddExpenseAction {
  type: ExpensifyType.ADD_EXPENSE;
  expense: IExpenseState;
}

interface RemoveExpenseAction {
  type: ExpensifyType.REMOVE_EXPENSE;
  id?: string;
}

type ExpensifyActionType =
  | AddExpenseAction
  | RemoveExpenseAction
  ;

interface IExpenseState {
  id?: string;
  description: string;
  note?: string;
  amount: number;
  createdAt?: number;
}

interface IFiltersState {
  text: string;
  sortedBy: string;
  startDate: number | undefined;
  endDate: number | undefined;
}

const addExpense = (expense: IExpenseState =
  {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  }): AddExpenseAction => {
  return {
    type: ExpensifyType.ADD_EXPENSE,
    expense: {
      id: uuid(),
      description: expense.description,
      note: expense.note,
      amount: expense.amount,
      createdAt: expense.amount,
    }
  };
};

const removeExpense = (id: string): RemoveExpenseAction => ({
  type: ExpensifyType.REMOVE_EXPENSE,
  id: id,
});

const expensesDefaultState: IExpenseState[] = [];
const expensesReducer = (states: IExpenseState[] = expensesDefaultState, action: ExpensifyActionType) => {
  switch (action.type) {
    case ExpensifyType.ADD_EXPENSE:
      return [...states, action.expense];
    case ExpensifyType.REMOVE_EXPENSE:
      return states.filter((state: IExpenseState) => state.id !== action.id);
    default: return states;
  }
};

const filterDefaultState: IFiltersState = {
  text: '',
  sortedBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state: IFiltersState = filterDefaultState, action: ExpensifyActionType) => {
  switch (action.type) {
    default: return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

store.dispatch(removeExpense(expenseOne.expense.id!));

const demoState = {
  expenses: [{
    id: 'asdsadsad',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
