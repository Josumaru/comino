import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import BackgroundConstants from '@/constants/images/BackgroundConstants'

const ProfileBar = () => {
  return (
    <View className='mx-5 mt-5 flex flex-row justify-between'>
      <View className='flex'>
        <Text className='font-regular text-xl'>{"Hii, Josumaru !👋"}</Text>
        <Text className='font-regular dark:color-white color-gray-500 text-sm'>{"Good Morning,  Kang Han's Sister just released"}</Text>
      </View>
        <Image cachePolicy={"disk"} source={BackgroundConstants.onboardingBackgroundImage} className="w-12 h-12 rounded-full"/>
    </View>
  )
}

export default ProfileBar