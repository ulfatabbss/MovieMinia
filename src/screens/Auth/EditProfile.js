import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import heading from '../../utillis/fonts'
import Color from '../../utillis/fonts'
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow } from '../../assets';
import { useTheme } from 'react-native-paper';

const EditProfile = ({ navigation }) => {
    const { myTheme, user, isGuest } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [selectimage, setSelectimage] = useState(isGuest ? null : user.profilePicture)

    const ImagePicker = () => {
        console.log("gggggg")
        let options = {
            storageOptions: {

                path: 'image'
            },

        };
        launchImageLibrary(options, response => {
            console.log(response.assets[0].uri);
            setSelectimage(response.assets[0].uri)
        });

    }
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme.colors.background }]}>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.img1, { tintColor: theme.colors.icon }]}
                            resizeMode='contain'
                            source={backErrow}></Image>

                    </TouchableOpacity>
                    <Text
                        style={[heading.h4, { marginLeft: '5%', color: theme.colors.text }]}>EditProfile

                    </Text>

                </View>




            </View>
            <View
                style={styles.V3}>
                <Image
                    style={styles.img3}
                    resizeMode='cover'
                    source={{ uri: selectimage }}>

                </Image>

            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <TouchableOpacity onPress={() => ImagePicker()}>
                    <Image
                        style={{ height: 17, width: 17, tintColor: theme.colors.icon }}
                        resizeMode='contain'
                        source={require('../../assets/cam.png')}>

                    </Image>
                </TouchableOpacity>

            </View>

            <View
                style={[styles.V4, { backgroundColor: theme.colors.background }]}>
                <View
                    style={[styles.V6, { backgroundColor: theme.colors.tabs, elevation: 5 }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%', color: theme.colors.text }]} placeholderTextColor={'gray'}
                        placeholder='First Name'></TextInput>

                </View>
                <View
                    style={[styles.V7, { backgroundColor: theme.colors.tabs, elevation: 5 }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%', color: theme.colors.text }]} placeholderTextColor={'gray'}
                        placeholder=' Last Name'></TextInput>

                </View>
                <View
                    style={[styles.V7, { backgroundColor: theme.colors.tabs, elevation: 5 }]}>
                    <TextInput
                        style={[heading.h6, { marginLeft: '5%', color: theme.colors.text }]} placeholderTextColor={'gray'}
                        placeholder='Email'></TextInput>

                </View>




            </View>

            <TouchableOpacity
                style={styles.V8}>
                <Text
                    style={[heading.h5, { fontWeight: '700', color: 'white' }]}>Save Changes!</Text>

            </TouchableOpacity>





        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
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
    V7: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 20,
        justifyContent: 'center'
    },
    V6: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '10%',
        borderRadius: 20,
        justifyContent: 'center'
    },
    V4: {
        height: '100%',
        width: '100%',
        // backgroundColor: Color.prime,
        marginTop: '7%'



    },
    V3: {
        height: 106,
        width: 106,
        borderRadius: 90,
        marginTop: '6%', alignSelf: 'center', overflow: 'hidden'

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
        overflow: 'hidden'
    },
    V5: {
        height: 35,
        width: 35,
        borderRadius: 90,
        backgroundColor: '#DBF2FB',
        alignSelf: 'center',
        left: '9%',
        bottom: '4%',
        justifyContent: 'center',
        alignItems: 'center'
    }

})