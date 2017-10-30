import { IExpenseState } from '../actions/expenses/expensesTypes';
import { IFiltersState } from '../actions/filters/filtersTypes';

const getVisibleExpenses = (expenses: IExpenseState[], filter: IFiltersState): IExpenseState[] => {
  return expenses.filter((expense: IExpenseState) => {
    const startDateMatch = !expense.createdAt || !filter.startDate || expense.createdAt >= filter.startDate;
    const endDateMatch = !expense.createdAt || !filter.endDate || expense.createdAt <= filter.endDate;
    const textMatch = filter.text === '' || expense.description.toLowerCase().includes(filter.text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a: IExpenseState, b: IExpenseState) => {
    if (filter.sortedBy === 'date') {
      return b.createdAt! - a.createdAt!;
    } else {
      return b.amount! - a.amount!;
    }
  })
    ;

  // return expenses;
};

export default getVisibleExpenses;
