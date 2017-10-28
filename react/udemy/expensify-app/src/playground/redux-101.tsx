import { createStore } from 'redux';

enum TypeKeys {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  SET = 'SET'
}

interface IncrementAction {
  type: TypeKeys.INCREMENT;
  incrementBy: number;
}

interface DecrementAction {
  type: TypeKeys.DECREMENT;
  decrementBy: number;
}

interface ResetAction {
  type: TypeKeys.RESET;
}

interface SetAction {
  type: TypeKeys.SET;
  to: number;
}

type ActionTypes =
  | IncrementAction
  | DecrementAction
  | ResetAction
  | SetAction;

interface ICountState {
  count: number;
}

const countReducer = (state: ICountState = { count: 0 }, action: ActionTypes): ICountState => {
  switch (action.type) {
    case TypeKeys.INCREMENT:
      return {
        count: state.count + action.incrementBy
      };
    case TypeKeys.DECREMENT:
      return {
        count: state.count - action.decrementBy
      };
    case TypeKeys.RESET:
      return {
        count: 0,
      };
    case TypeKeys.SET:
      return {
        count: action.to,
      };
    default:
      return {
        count: state.count
      };
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const incrementCount = (incrementBy: number = 1): IncrementAction => ({
  type: TypeKeys.INCREMENT,
  incrementBy
});

const decrementCount = (decrementBy: number = 1): DecrementAction => ({
  type: TypeKeys.DECREMENT,
  decrementBy
});

const resetCount = (): ResetAction => ({
  type: TypeKeys.RESET
});

const setCount = (to: number): SetAction => ({
  type: TypeKeys.SET,
  to
});

store.dispatch(incrementCount());

store.dispatch(incrementCount(5));

// unsubscribe();


store.dispatch(resetCount());
store.dispatch(setCount(90));
store.dispatch(decrementCount());
store.dispatch(decrementCount(5));

