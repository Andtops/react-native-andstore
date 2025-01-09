import { View, Text, StatusBar } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <Text style={{ color: 'red' }}>Home Screen</Text>
    </View>
  )
}

export default HomeScreen