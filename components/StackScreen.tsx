import { Stack } from 'expo-router'
import React from 'react'

type ScreenType = {
    screen: string[]
}

const StackScreen = ({screen}:ScreenType) => {
  const option = { headerShown: false };
  return (
    screen.map((screenName) => (
        <Stack.Screen key={screenName} name={screenName} options={option}/>
      ))
  )
}

export default StackScreen