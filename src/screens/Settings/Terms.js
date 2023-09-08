import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import Color from '../../utillis/colors'
import { useSelector } from 'react-redux'
import { backErrow } from '../../assets'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { useTheme } from 'react-native-paper'
import { Heading, text } from '../../utillis/styles'

const Terms = ({ navigation }) => {
    const { myTheme, } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.topbar }}>
            <StatusBar backgroundColor={theme.colors.topbar} barStyle={myTheme == 'lightTheme' ? 'dark-content' : 'light-content'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backButton, { tintColor: theme.colors.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={{ ...Heading, color: theme.colors.text }}>Terms & Conditions</Text>
            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <View
                    style={{ width: '90%', alignSelf: 'center', marginTop: '5%', }}>
                    <Text
                        style={{ ...text, color: theme.colors.text }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna

                    </Text>
                    <Text
                        style={{ ...text, color: theme.colors.text }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pecenas pulvinar bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna

                    </Text>
                    <Text
                        style={{ ...text, color: theme.colors.text }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pecenas pulvinar bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.

                    </Text>
                    <Text
                        style={{ ...text, color: theme.colors.text }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet.

                    </Text>
                    <Text
                        style={{ ...text, color: theme.colors.text }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>

                </View>


            </View>
        </SafeAreaView>
    )
}

export default Terms

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
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 10
        // justifyContent: 'space-between',
    },
    backButton: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
})