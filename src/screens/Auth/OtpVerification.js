import { StyleSheet, Text, View, Image, ScrollView, Alert, SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { container, FlexDirection, smalltext } from '../../utillis/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import { RF } from '../../utillis/theme/Responsive';
import NavHeader from '../../components/NavHeader';
import OTPTextInput from 'react-native-otp-textinput';
import HeadingTitle from '../../components/HeadingTitle';
import Button from '../../components/Button';
import { ConforOtp, DeleteAccountApi, SendOTP } from '../../services/AppServices';
import { Black, Secondary } from '../../utillis/theme';
import { Primary, black } from '../../utillis/colors';
import { setGuest, setIsFacebook, setIsGoogle, setIsLogin } from '../../redux/reducers/userReducers';
import Loader from '../../components/Loader';

const OTPverification = ({ navigation, route }) => {
    const [timer, setTimer] = useState(30);
    const { value, type } = route.params || {};
    let otpInput = useRef(null);
    const dispatch = useDispatch();
    const [OTP, setOtp] = useState('')
    const { myTheme, user } = useSelector(state => state.root.user) || {};
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (timer <= 0) {
            // Timer has reached zero, navigate or take appropriate action here
            // You can navigate to the next screen here if needed
        } else {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [timer]);
    const handleVerification = async () => {
        const obj = {
            email: value,
        };
        if (obj) {
            const result = await SendOTP(obj);
        }
    };
    const resetTimer = () => {
        handleVerification();
        if (otpInput.current) {
            otpInput.current.clear();
        }
        setTimer(30); // Reset the timer to 30 seconds
    };
    const handleCodeFilled = async (otp) => {
        setOtp(otp)
    };
    const HandleOtp = async () => {
        setIsLoading(true)
        otpObj = {
            email: value,
            otp: OTP
        }
        const result = await ConforOtp(otpObj)
        if (result.data.status === true) {
            if (type == 'update') {
                navigation.navigate('UpdatePassword', { value: value })
            } else {
                const id = user?._id
                const result = await DeleteAccountApi(id)
                if (result.data.status == true) {
                    await dispatch(setIsLogin(false))
                    await navigation.replace("Signin")
                    Alert.alert('Account Delete Successfully...!')
                }
                else {
                    setModalVisible(false)
                    Alert.alert('something went wronggggg!')
                }
            }
            if (otpInput.current) {
                otpInput.current.clear();
            }
        } else {
            Alert.alert(result?.data?.message);
            if (otpInput.current) {
                otpInput.current.clear();
            }
        }
        setIsLoading(false)
    }

    if (isLoading) {
        return <Loader />;
    }
    return (
        <SafeAreaView style={[container, { backgroundColor: theme?.colors?.background }]}>
            <NavHeader navigation={navigation} title={'OTP Verification'} />
            <View style={{ flex: 1, backgroundColor: theme?.colors?.background }}>
                <Image
                    style={{ height: RF(300), width: '100%' }}
                    source={require('../../assets/appIcons/otp.png')}
                    resizeMode={'contain'}
                />
                <HeadingTitle
                    title1={'Hi there!'}
                    titile2={`Please enter the 4 digit OTP we just sent on  ${value}!`}
                />
                <OTPTextInput
                    tintColor={Primary}
                    textInputStyle={{
                        backgroundColor: theme?.colors?.tabs,
                        borderRadius: 10,
                        height: RF(54),
                        width: RF(54),
                    }}
                    handleTextChange={text => {
                        if (text.length === 4) {
                            handleCodeFilled(text); // Handle OTP input completion
                        }
                    }}
                    ref={otpInput}></OTPTextInput>

                <View style={[FlexDirection, { marginBottom: RF(30) }]}>
                    <Text
                        onPress={() => resetTimer()}
                        disabled={timer == 0 ? false : true}
                        style={{
                            ...smalltext,
                            fontSize: RF(14),
                            color: Secondary,
                            fontFamily: 'Raleway-Regular',
                        }}>
                        Re-send OTP
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={{
                                ...smalltext,
                                fontSize: RF(14),
                                fontFamily: 'Raleway-Regular',
                                color: theme?.colors?.text
                            }}>
                            Time:
                        </Text>
                        <Text
                            style={{
                                ...smalltext,
                                fontSize: RF(14),
                                color: Secondary,
                                marginLeft: 5,
                                fontFamily: 'Raleway-Bold',
                            }}>
                            0:{timer} sec
                        </Text>
                    </View>
                </View>
                <Button
                    title={'Confirm'}
                    screen={() => HandleOtp()}
                />
            </View>
        </SafeAreaView>
    );
};

export default OTPverification;

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: '#03DAC6',
    },

    underlineStyleBase: {
        width: RF(55),
        height: RF(55),
        borderWidth: 0,
        borderRadius: 10,
        color: '#000',
        fontWeight: '900',
        fontSize: RF(22),
        backgroundColor: '#fff',
    },

    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
    img1: {
        height: 25,
        width: 20,
        alignSelf: 'center'
    },
});
