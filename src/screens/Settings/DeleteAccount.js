import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import heading from '../../utillis/fonts'
import { useDispatch, useSelector } from 'react-redux'
import { backErrow, caution } from '../../assets'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { text, Heading } from '../../utillis/styles'
import { RF } from '../../utillis/theme/Responsive'
import { DeleteAccountApi } from '../../services/AppServices'
import HeadingText from '../../components/CustomText'
import { Secondary, White } from '../../utillis/theme'
import { Primary } from '../../utillis/colors'
const DeleteAccount = ({ navigation }) => {
    const { myTheme, user } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false)
    const handleDeleteAccount = async () => {

        const id = user._id
        // const id = '64c3e3b0eb8bd300eb4cad71'
        const result = await DeleteAccountApi(id)
        if (result.data.status == true) {
            dispatch(setIsLogin(false))
            setModalVisible(false)
        }
        else {
            setModalVisible(false)
            Alert.alert('something went wronggggg!')
        }
        // dispatch(setLoading(false))
        // console.log(result.data, "uyghihiouioj");
    }

    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme.colors.topbar }]}>

            {modalVisible ? <View style={styles.modal_FadeView} /> : null}
            <Modal animationType="slide" transparent={true} visible={modalVisible}><View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                    <Image style={{ height: RF(90), width: RF(90) }} source={caution} />
                    <HeadingText title={'Alert'} bold size={20} top={5} />
                    <HeadingText
                        title={
                            'Are you sure to delete this Account?'
                        }
                        regular
                        size={16}
                        top={10}
                        alignCenter
                    />
                    <View style={styles.button_View}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDeleteAccount}>
                            <HeadingText
                                title={'Ok'}
                                semi_bold
                                size={16}
                                color={White}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.signUp_Button]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <HeadingText
                                title={'Cancel'}
                                semi_bold
                                size={16}
                                color={Secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View></Modal>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.img1, { tintColor: theme.colors.icon }]}
                            resizeMode='contain'
                            source={backErrow} />

                    </TouchableOpacity>
                    <Text
                        style={[heading.h4, { marginLeft: '5%', color: theme.colors.text }]}>Delete Account
                    </Text>
                </View>
            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <View
                    style={styles.V3}>
                    <Image
                        style={styles.img3}
                        resizeMode='contain'
                        source={require('../../assets/appIcons/alrt.png')}>
                    </Image>
                    <Text style={{ ...Heading, color: '#E00000', marginLeft: '2%' }}>Delete your account will:
                    </Text>
                </View>
                <View
                    style={styles.V4}>
                    <Text
                        style={{ ...text, marginTop: '5%', color: theme.colors.text }}> We're sorry to see you go. If you're sure you want to delete your moviemina account, please be aware that this action is permanent and cannot be undone. All of your personal information, including your playlist and settings, will be permanently deleted.
                    </Text>
                    <Text
                        style={{ ...text, marginTop: '5%', color: theme.colors.text }}> If you're having trouble with your account or have concerns, please reach out to us at moviemina@webevis.com before proceeding with the account deletion. We'd love to help you resolve any issues and keep you as a valued moviemina user.
                    </Text>
                    <Text
                        style={{ ...text, marginTop: '5%', color: theme.colors.text }}> To Delete your account, confirm your country code and enter your phone number.
                    </Text>
                    <Text
                        style={{ ...Heading, marginTop: '5%', color: theme.colors.text, fontSize: RF(16) }}> Enter Email
                    </Text>
                    <View
                        style={[styles.V7, { backgroundColor: theme.colors.tabs }]}>
                        <TextInput
                            style={{ ...text, marginLeft: '5%', color: theme.colors.text }} placeholderTextColor={theme.colors.text}
                            placeholder='Email'></TextInput>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.V8} onPress={() => setModalVisible(true)}>
                <Text
                    style={[heading.h5, { fontWeight: '700', color: 'white' }]}>Delete Account</Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DeleteAccount

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
    }, V5: {
        height: '100%',
        // backgroundColor:Color.prime
    },
    V3: {
        flexDirection: "row", alignItems: 'center',
        width: '90%', alignSelf: 'center', marginTop: '5%'
    },
    img3: {
        height: 18, width: 18,
    },
    V4: {
        width: '90%', alignSelf: 'center'

    }, V7: {
        height: 45,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 50,
        justifyContent: 'center', elevation: 2
    },
    V8: {
        height: 48,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: '#720808',
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
    modal_FadeView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 500,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalCard: {
        height: RF(300),
        width: '100%',
        borderRadius: RF(30),
        backgroundColor: White,
        padding: 20,
        alignItems: 'center',
    },
    button_View: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        marginTop: RF(40),
    },
    button: {
        height: RF(40),
        width: '45%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Primary,
    },
    signUp_Button: {
        backgroundColor: White,
        borderColor: Secondary, elevation: 5
    },
    deleteAccount: {
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: 2,
        position: 'absolute',
        bottom: 0,
        height: 60,
        alignItems: 'center', paddingHorizontal: 10

    },
    deleteAccountButton: {
        flexDirection: 'row', gap: 10
    },
    deleteAccountIcon: {
        height: 25,
        width: 25
    },
})