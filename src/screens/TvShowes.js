import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black } from '../utillis/colors'

const TvShowes = () => {
  return (
    <View style={{flex:1, backgroundColor: black, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20, color: '#fff'}}>Tv Showes</Text>
    </View>
  )
}

export default TvShowes

const styles = StyleSheet.create({})