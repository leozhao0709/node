import {
  SetTextFilterAction, FilterType, SortByDateAction,
  SortByAmountAction, SetStartDateAction, SetEndDateAction
} from './filtersTypes';

export const setFilterText = (text: string = ''): SetTextFilterAction => {
  return {
    type: FilterType.SET_TEXT_FILTER,
    text: text,
  };
};

export const sortByDate = (): SortByDateAction => {
  return {
    type: FilterType.SORT_BY_DATE,
  };
};

export const sortByAmount = (): SortByAmountAction => {
  return {
    type: FilterType.SORT_BY_AMOUNT,
  };
};

export const setStartDate = (startDate?: number): SetStartDateAction => {
  return {
    type: FilterType.SET_START_DATE,
    startDate: startDate
  };
};

export const setEndDate = (endDate?: number): SetEndDateAction => {
  return {
    type: FilterType.SET_END_DATE,
    endDate: endDate
  };
};
