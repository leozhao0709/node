export enum ExpenseType {
  ADD_EXPENSE = 'ADD_EXPENSE',
  REMOVE_EXPENSE = 'REMOVE_EXPENSE',
  EDIT_EXPENSE = 'EDIT_EXPENSE',
}

export interface IExpenseState {
  id?: string;
  description: string;
  note?: string;
  amount?: number;
  createdAt?: number;
}


export interface AddExpenseAction {
  type: ExpenseType.ADD_EXPENSE;
  expense: IExpenseState;
}

export interface RemoveExpenseAction {
  type: ExpenseType.REMOVE_EXPENSE;
  id?: string;
}

export interface EditExpenseAction {
  type: ExpenseType.EDIT_EXPENSE;
  id: string;
  expense: IExpenseState;
}

export type ExpenseActionType =
  | AddExpenseAction
  | RemoveExpenseAction
  | EditExpenseAction
  ;
