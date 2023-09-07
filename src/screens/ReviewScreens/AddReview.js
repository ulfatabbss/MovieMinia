import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Primary } from '../../utillis/colors'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { Heading } from '../../utillis/styles'
import { backErrow, guest } from '../../assets'
import { AddFeedback } from '../../services/AppServices'
const AddReview = ({ navigation }) => {

    const { myTheme, user, isGuest } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const [feedback, setFeedback] = useState('')
    const fetchData = async () => {
        try {
            const obj = {
                user_id: user._id,
                feedback_text: feedback
            }
            const check = await AddFeedback(obj)
            console.log(check.data);
        } catch (error) {
            console.log(error, 'errors');

        }
    };
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme.colors.topbar }]}>
            <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backButton, { tintColor: theme.colors.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={{ ...Heading, color: theme.colors.text }}>Add Review</Text>
            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <View
                    style={[styles.V3, { backgroundColor: theme.colors.tabs, elevation: 5, shadowOpacity: 0.5, shadowOffset: .5 }]}>
                    <TextInput
                        style={{ font: 18, fontWeight: '500', color: theme.colors.text }} placeholder='Describe your Experience!' placeholderTextColor={'gray'} onChangeText={(text) => setFeedback(text)} value={feedback}>
                    </TextInput>
                </View>
            </View>
            <TouchableOpacity disabled={isGuest} onPress={() => fetchData()}
                style={styles.V8}>
                <Text
                    style={{ ...Heading, color: "white" }}>Add Review!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddReview

const styles = StyleSheet.create({
    V1: {
        flex: 1,
        backgroundColor: Primary

    },
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
    },
    V5: { height: '100%', backgroundColor: Primary },

    img2: {
        height: 16, width: 16, marginRight: '5%'
    },
    V3: {
        marginTop: '5%',
        width: '90%',
        height: 240,
        alignSelf: 'center',
        backgroundColor: '#F0F2F3',
        borderRadius: 20, padding: 20
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