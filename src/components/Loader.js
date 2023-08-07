import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <LottieView resizeMode='contain' style={{ height: 100, width: 100 }}
                source={require('../assets/animation_lkseftee.json')} autoPlay loop />
            <Text style={{ fontSize: 12, color: 'white' }}>Please wait...</Text>
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({})