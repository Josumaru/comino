import { View, Text, Image } from 'react-native'
import React from 'react'
import BackgroundConstants from '@/constants/images/BackgroundConstants'

const ProfileBar = () => {
  return (
    <View className='mx-5 mt-5'>
      <View className='flex flex-row gap-2 items-center'>
        <Image source={BackgroundConstants.onboardingBackgroundImage} className="w-12 h-12 rounded-full"/>
        <Text className='font-regular text-xl'>{"Good Morning, Josumaru !"}</Text>
      </View>
    </View>
  )
}

export default ProfileBar