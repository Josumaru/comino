import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Index = () => {
  return (
    <View  className='dark:bg-black'>
        <SafeAreaView>
            <Text className='text-4xl p-10 dark:text-white'>Read 1000+ of Manga in single Apps</Text>
        </SafeAreaView>
    </View>
  )
}

export default Index