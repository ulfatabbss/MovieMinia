import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black } from '../utillis/colors'

const Find = () => {
  return (
    <View style={{flex:1, backgroundColor: black, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20, color: '#fff'}}>Find</Text>
    </View>
  )
}

export default Find

const styles = StyleSheet.create({})