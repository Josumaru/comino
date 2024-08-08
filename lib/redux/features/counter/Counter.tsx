import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

import { decrement, increment } from "./counterSlice";
import { View, Text } from "react-native";
import Button from "@/components/Button";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // omit rendering logic
  return <View>
    <Button title="-" onClick={() => dispatch(decrement())}/>
    <Text>{count}</Text>
    <Button title="+" onClick={() => dispatch(increment())}/>
  </View>
}
