import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black } from '../utillis/colors'

const Cartoons = () => {
  return (
    <View style={{flex:1, backgroundColor: black, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20, color: '#fff'}}>Cartoons</Text>
    </View>
  )
}

export default Cartoons

const styles = StyleSheet.create({})