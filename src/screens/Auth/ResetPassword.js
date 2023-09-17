import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { backErrow } from '../../assets'
import NavHeader from '../../components/NavHeader'

const PasswordSettings = ({ navigation }) => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);

    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme?.colors?.topbar }]}>
            <NavHeader navigation={navigation} title={'Password Settings'} />
            <View
                style={[styles.V5, { backgroundColor: theme?.colors?.background }]}>
                <View
                    style={[styles.V6, { backgroundColor: theme?.colors?.tabs }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%', color: theme?.colors?.text }]} placeholderTextColor={theme?.colors?.text}
                        placeholder='*********'></TextInput>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <Image
                            style={[styles.img2, { tintColor: theme?.colors?.icon }]}
                            resizeMode='contain'
                            source={require('../../assets/edit.png')}>

                        </Image>

                    </TouchableOpacity>


                </View>


            </View>
        </SafeAreaView>
    )
}

export default PasswordSettings

const styles = StyleSheet.create({
    V1: {
        flex: 1
    },
    V2: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    img1: {
        height: 25,
        width: 20,
        alignSelf: 'center'
    }, V5: { height: '100%', },
    V6: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '10%',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img2: {
        height: 16, width: 16, marginRight: '5%'
    }
})