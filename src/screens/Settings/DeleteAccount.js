import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Modal, Keyboard, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import heading from '../../utillis/fonts'
import { useDispatch, useSelector } from 'react-redux'
import { Message, backErrow, caution } from '../../assets'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { text, Heading } from '../../utillis/styles'
import { RF } from '../../utillis/theme/Responsive'
import { SendOTP } from '../../services/AppServices'
import { Secondary, White } from '../../utillis/theme'
import { Primary } from '../../utillis/colors'
import Loader from '../../components/Loader'
import { otpVerification } from '../../utillis/validationSchema'
import { Formik } from 'formik'
const DeleteAccount = ({ navigation }) => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [isLoading, setIsLoading] = useState(false);
    const [logoVisible, setLogoVisible] = useState(true);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setLogoVisible(false),
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setLogoVisible(true),
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const initialValues = { email: '' };
    const handleVerification = async (values) => {
        // console.log(values);
        try {
            setIsLoading(true)
            const obj = {
                email: values.email,
            };
            if (obj) {
                const result = await SendOTP(obj)
                if (result.data.status === true) {
                    navigation.navigate("OTPverification", { value: values.email, type: 'delete' });
                } else {
                    Alert.alert(
                        result?.data?.message
                    )
                }
            }
            setIsLoading(false)
        } catch (error) {
            if (error.message === 'Network Error') {
                Alert.alert('⚠️ Check your internet connection and try again .....!');
            } else {
                Alert.alert('⚠️ An error occurred. Please try again later.');
            }
        }
    };
    if (isLoading) {
        return <Loader />;
    }
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme?.colors?.topbar }]}>
            <Formik
                initialValues={initialValues}
                validateOnMount={true}
                validationSchema={otpVerification}
                onSubmit={values => {
                    // console.log('values', values);
                    handleVerification(values);
                }}>
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <>
                        <View
                            style={styles.V2}>
                            <View style={{ flexDirection: 'row' }}>

                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image
                                        style={[styles.img1, { tintColor: theme?.colors?.icon }]}
                                        resizeMode='contain'
                                        source={backErrow} />

                                </TouchableOpacity>
                                <Text
                                    style={[heading.h4, { marginLeft: '5%', color: theme?.colors?.text }]}>Delete Account
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[styles.V5, { backgroundColor: theme?.colors?.background }]}>
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
                                {logoVisible &&
                                    <>
                                        <Text
                                            style={{ ...text, marginTop: '5%', color: theme?.colors?.text }}> We're sorry to see you go. If you're sure you want to delete your moviemina account, please be aware that this action is permanent and cannot be undone. All of your personal information, including your playlist and settings, will be permanently deleted.
                                        </Text>
                                        <Text
                                            style={{ ...text, marginTop: '5%', color: theme?.colors?.text }}> If you're having trouble with your account or have concerns, please reach out to us at moviemina@webevis.com before proceeding with the account deletion. We'd love to help you resolve any issues and keep you as a valued moviemina user.
                                        </Text>
                                        <Text
                                            style={{ ...text, marginTop: '5%', color: theme?.colors?.text }}> To Delete your account, confirm your country code and enter your phone number.
                                        </Text>
                                        <Text
                                            style={{ ...Heading, marginTop: '5%', color: theme?.colors?.text, fontSize: RF(16) }}> Enter Email
                                        </Text>
                                    </>}
                                <View
                                    style={[styles.inputView, { backgroundColor: theme?.colors?.tabs }]}>
                                    <Image
                                        style={{
                                            height: RF(20),
                                            width: RF(20),
                                            tintColor: theme?.colors?.icon,
                                        }}
                                        source={Message}
                                    />
                                    <TextInput
                                        placeholder="Enter your email"
                                        placeholderTextColor="grey"
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        autoCapitalize={'none'}
                                        style={[
                                            styles.emailInput,
                                            { backgroundColor: theme?.colors?.tabs, color: theme?.colors?.text },
                                        ]}
                                    />
                                </View>
                                {errors.email && touched.email && (
                                    <Text style={styles.errors}>{errors.email}</Text>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.V8} onPress={() => handleSubmit()}>
                            <Text
                                style={[heading.h5, { fontWeight: '700', color: 'white' }]}>Delete Account</Text>

                        </TouchableOpacity>
                    </>
                )}</Formik>
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
    inputView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: RF(20),
        borderRadius: 50,
        backgroundColor: '#333333',
        color: '#fff', elevation: 2
    },
    emailInput: {
        width: '85%',
        paddingLeft: RF(10),
        height: '100%',
        fontSize: RF(14),
    },

    errors: {
        fontSize: 12,
        marginStart: 10,
        color: Primary,
    },
})