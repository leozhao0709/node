import { v4 as uuid } from 'uuid';
import { AddExpenseAction, ExpenseType, RemoveExpenseAction, IExpenseState, EditExpenseAction } from './expensesTypes';

export const addExpense = (expense: IExpenseState =
  {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  }): AddExpenseAction => {
  return {
    type: ExpenseType.ADD_EXPENSE,
    expense: {
      id: uuid(),
      ...expense
    }
  };
};

export const removeExpense = (id: string): RemoveExpenseAction => ({
  type: ExpenseType.REMOVE_EXPENSE,
  id: id,
});

export const editExpense = (id: string, newExpense: IExpenseState): EditExpenseAction => {
  return {
    type: ExpenseType.EDIT_EXPENSE,
    id: id,
    expense: newExpense,
  };
};
