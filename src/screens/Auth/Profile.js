import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux';
import { backErrow } from '../../assets';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';

const Profile = ({ navigation }) => {
    const { myTheme, user, google } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'darkTheme' ? darkTheme : lightTheme);
    return (
        <SafeAreaView
            style={{ ...styles.V1, backgroundColor: theme.colors.topbar }}>
            <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />

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
                        style={[heading.h4, { marginLeft: '5%', color: theme.colors.text }]}>My Profile

                    </Text>

                </View>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Image
                        style={{ ...styles.img2, tintColor: theme.colors.icon }}
                        resizeMode='contain'
                        source={require('../../assets/edit.png')}></Image>
                </TouchableOpacity>



            </View>
            <View
                style={styles.V3}>
                <Image
                    style={styles.img3}
                    resizeMode='contain'
                    source={{ uri: google ? user.photo : user?.profilePicture }}>

                </Image>

            </View>
            <Text
                style={[heading.h4, { alignSelf: 'center', marginTop: '5%', color: theme.colors.text }]}>{user?.name}</Text>
            <View
                style={[styles.V4, { backgroundColor: theme.colors.background }]}>
                <Text
                    style={[heading.h5, { marginTop: '5%', marginLeft: '5%', color: theme.colors.text }]}>Email</Text>
                <Text
                    style={[heading.h5, { marginTop: '2%', marginLeft: '5%', fontWeight: '600', color: theme.colors.text }]}>{user?.email}</Text>



            </View>


        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    V4: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        marginTop: '7%'



    },
    V3: {
        height: 106,
        width: 106,
        borderRadius: 90,
        marginTop: '6%', alignSelf: 'center'

    },
    V1: {
        flex: 1,
        backgroundColor: '#f5e9cd'
    },
    V2: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    img1: {
        height: 25,
        width: 20,
        alignSelf: 'center'
    },
    img2: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },
    img3: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 100,
    },

})