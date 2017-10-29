export enum FilterType {
  SET_TEXT_FILTER = 'SET_TEXT_FILTER',
  SORT_BY_DATE = 'SORT_BY_DATE',
  SORT_BY_AMOUNT = 'SORT_BY_AMOUNT',
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE'
}

export interface IFiltersState {
  text: string;
  sortedBy: string;
  startDate?: number;
  endDate?: number;
}

export interface SetTextFilterAction {
  type: FilterType.SET_TEXT_FILTER;
  text: string;
}

export interface SortByDateAction {
  type: FilterType.SORT_BY_DATE;
}

export interface SortByAmountAction {
  type: FilterType.SORT_BY_AMOUNT;
}

export interface SetStartDateAction {
  type: FilterType.SET_START_DATE;
  startDate?: number;
}

export interface SetEndDateAction {
  type: FilterType.SET_END_DATE;
  endDate?: number;
}

export type FilterActionType =
  |SetTextFilterAction
  | SortByDateAction
  | SortByAmountAction
  | SetStartDateAction
  | SetEndDateAction
  ;
