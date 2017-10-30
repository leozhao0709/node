import { IFiltersState, FilterType, FilterActionType } from '../actions/filters/filtersTypes';

const filterDefaultState: IFiltersState = {
  text: '',
  sortedBy: 'date',
  startDate: undefined,
  endDate: undefined
};

export const filtersReducer = (state: IFiltersState = filterDefaultState, action: FilterActionType): IFiltersState => {
  switch (action.type) {
    case FilterType.SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      };
    case FilterType.SORT_BY_DATE:
      return {
        ...state,
        sortedBy: 'date'
      };
    case FilterType.SORT_BY_AMOUNT:
      return {
        ...state,
        sortedBy: 'amount'
      };
    case FilterType.SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate
      };
    case FilterType.SET_END_DATE:
      return {
        ...state,
        endDate: action.endDate
      };
    default: return state;
  }
};

export default filtersReducer;
