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

interface EditExpenseAction {
  type: ExpensifyType.EDIT_EXPENSE;
  id: string;
  expense: IExpenseState;
}

interface SetTextFilterAction {
  type: ExpensifyType.SET_TEXT_FILTER;
  text: string;
}

interface SortByDateAction {
  type: ExpensifyType.SORT_BY_DATE;
}

interface SortByAmountAction {
  type: ExpensifyType.SORT_BY_AMOUNT;
}

interface SetStartDateAction {
  type: ExpensifyType.SET_START_DATE;
  startDate?: number;
}

interface SetEndDateAction {
  type: ExpensifyType.SET_END_DATE;
  endDate?: number;
}

type ExpensifyActionType =
  | AddExpenseAction
  | RemoveExpenseAction
  | EditExpenseAction
  | SetTextFilterAction
  | SortByDateAction
  | SortByAmountAction
  | SetStartDateAction
  | SetEndDateAction
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
  startDate?: number;
  endDate?: number;
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
      createdAt: expense.createdAt,
    }
  };
};

const removeExpense = (id: string): RemoveExpenseAction => ({
  type: ExpensifyType.REMOVE_EXPENSE,
  id: id,
});

const editExpense = (id: string, newExpense: IExpenseState): EditExpenseAction => {
  return {
    type: ExpensifyType.EDIT_EXPENSE,
    id: id,
    expense: newExpense,
  };
};

const setFilterText = (text: string = ''): SetTextFilterAction => {
  return {
    type: ExpensifyType.SET_TEXT_FILTER,
    text: text,
  };
};

const sortByDate = (): SortByDateAction => {
  return {
    type: ExpensifyType.SORT_BY_DATE,
  };
};

const sortByAmount = (): SortByAmountAction => {
  return {
    type: ExpensifyType.SORT_BY_AMOUNT,
  };
};

const setStartDate = (startDate?: number): SetStartDateAction => {
  return {
    type: ExpensifyType.SET_START_DATE,
    startDate: startDate
  };
};

const setEndDate = (endDate?: number): SetEndDateAction => {
  return {
    type: ExpensifyType.SET_END_DATE,
    endDate: endDate
  };
};

const expensesDefaultState: IExpenseState[] = [];
const expensesReducer = (states: IExpenseState[] = expensesDefaultState, action: ExpensifyActionType) => {
  switch (action.type) {
    case ExpensifyType.ADD_EXPENSE:
      return [...states, action.expense];
    case ExpensifyType.REMOVE_EXPENSE:
      return states.filter((state: IExpenseState) => state.id !== action.id);
    case ExpensifyType.EDIT_EXPENSE:
      return states.map((state: IExpenseState) => {
        if (state.id === action.id) {
          return {
            ...state,
            ...action.expense
          };
        } else {
          return state;
        }
      });
    default: return states;
  }
};

const filterDefaultState: IFiltersState = {
  text: '',
  sortedBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state: IFiltersState = filterDefaultState, action: ExpensifyActionType): IFiltersState => {
  switch (action.type) {
    case ExpensifyType.SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      };
    case ExpensifyType.SORT_BY_DATE:
      return {
        ...state,
        sortedBy: 'date'
      };
    case ExpensifyType.SORT_BY_AMOUNT:
      return {
        ...state,
        sortedBy: 'amount'
      };
    case ExpensifyType.SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate
      };
    case ExpensifyType.SET_END_DATE:
      return {
        ...state,
        endDate: action.endDate
      };
    default: return state;
  }
};

const store: any = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

const getVisibleExpense = (expenses: IExpenseState[], filter: IFiltersState): IExpenseState[] => {
  return expenses.filter((expense: IExpenseState) => {
    const startDateMatch = !expense.createdAt || !filter.startDate || expense.createdAt >= filter.startDate;
    const endDateMatch = !expense.createdAt || !filter.endDate || expense.createdAt <= filter.endDate;
    const textMatch = filter.text === '' || expense.description.toLowerCase().includes(filter.text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a: IExpenseState, b: IExpenseState) => {
    if (filter.sortedBy === 'date') {
      return b.createdAt! - a.createdAt!;
    } else {
      return b.amount - a.amount;
    }
  })
    ;

  // return expenses;
};

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpense = getVisibleExpense(state.expenses, state.filters);
  console.log(visibleExpense);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: -2100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -100 }));

// store.dispatch(removeExpense(expenseOne.expense.id!));
// store.dispatch(editExpense(expenseTwo.expense.id!, { ...expenseTwo.expense, amount: 500 }));

// store.dispatch(setFilterText('rent'));
// store.dispatch(setFilterText());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

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
