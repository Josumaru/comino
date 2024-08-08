import { CounterConstants } from "@/constants/Counter";

// Define action types
interface IncrementAction {
  type: typeof CounterConstants.INCREMENT;
}

interface DecrementAction {
  type: typeof CounterConstants.DECREMENT;
}

export type CounterActionTypes = IncrementAction | DecrementAction;

// Action creators
export const increment = (): IncrementAction => ({
  type: CounterConstants.INCREMENT,
});

export const decrement = (): DecrementAction => ({
  type: CounterConstants.DECREMENT,
});
