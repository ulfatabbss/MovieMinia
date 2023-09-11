import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Color from '../../utillis/colors'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { useTheme } from 'react-native-paper'
import { backErrow, hide } from '../../assets'

const ChangePassword = ({ navigation }) => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: '#313131' }]}>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={{ ...styles.img1, tintColor: theme.colors.icon }}
                            resizeMode='contain'
                            source={backErrow}></Image>

                    </TouchableOpacity>
                    <Text
                        style={{ ...heading.h4, marginLeft: '5%', color: theme.colors.text }}>Change Password

                    </Text>

                </View>


            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <Text
                    style={[heading.h5, { fontWeight: '700', marginLeft: '7%', marginTop: '5%', color: theme.colors.text }]}>CHANGE PASSWORD

                </Text>
                <Text
                    style={[heading.h6, { fontWeight: '400', marginLeft: '7%', marginTop: '2%', color: theme.colors.text }]}>Please enter a new password!

                </Text>
                <View
                    style={[styles.V6, { backgroundColor: '#313131' }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%' }]} placeholderTextColor={theme.colors.text}
                        placeholder='Current Password'></TextInput>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <Image
                            style={styles.img2}
                            resizeMode='contain'
                            source={hide}>

                        </Image>

                    </TouchableOpacity>


                </View>
                <View
                    style={[styles.V6, { marginTop: '5%', backgroundColor: '#313131' }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%' }]} placeholderTextColor={theme.colors.text}
                        placeholder='New Password'></TextInput>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <Image
                            style={styles.img2}
                            resizeMode='contain'
                            source={hide}>

                        </Image>

                    </TouchableOpacity>


                </View>
                <View
                    style={[styles.V6, { marginTop: '5%', backgroundColor: '#313131' }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%' }]} placeholderTextColor={theme.colors.text}
                        placeholder='Confirm New Password'></TextInput>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <Image
                            style={styles.img2}
                            resizeMode='contain'
                            source={hide}>

                        </Image>

                    </TouchableOpacity>


                </View>



            </View>
            <TouchableOpacity
                style={styles.V8}>
                <Text
                    style={[heading.h5, { fontWeight: '700', color: 'white' }]}>Save Password</Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    V1: {
        flex: 1,


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
    }, V5: { height: '100%' },
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
        height: 20, width: 20, marginRight: '5%'
    },
    V8: {
        height: 48,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#720808',
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
})