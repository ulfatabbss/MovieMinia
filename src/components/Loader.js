import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';

const Loader = () => {
    const {
        myTheme
    } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <LottieView resizeMode='contain' style={{ height: 100, width: 100 }}
                source={require('../assets/loader.json')} autoPlay loop />
            <Text style={{ fontSize: 12, color: theme.colors.text }}>Please wait...</Text>
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({})