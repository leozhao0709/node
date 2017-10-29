import { IExpenseState, ExpenseActionType, ExpenseType } from '../actions/expenses/expensesTypes';

const expensesDefaultState: IExpenseState[] = [];
const expensesReducer = (states: IExpenseState[] = expensesDefaultState, action: ExpenseActionType) => {
  switch (action.type) {
    case ExpenseType.ADD_EXPENSE:
      return [...states, action.expense];
    case ExpenseType.REMOVE_EXPENSE:
      return states.filter((state: IExpenseState) => state.id !== action.id);
    case ExpenseType.EDIT_EXPENSE:
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

export default expensesReducer;
