import { StyleSheet, Text, View, Image, ScrollView, Alert, SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { container, FlexDirection, smalltext } from '../../utillis/styles';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import { RF } from '../../utillis/theme/Responsive';
import NavHeader from '../../components/NavHeader';
import OTPTextInput from 'react-native-otp-textinput';
import HeadingTitle from '../../components/HeadingTitle';
import Button from '../../components/Button';
import { SendOTP } from '../../services/AppServices';
import { Black, Secondary } from '../../utillis/theme';
import { Primary, black } from '../../utillis/colors';
import { backErrow } from '../../assets';

const OTPverification = ({ navigation, route }) => {
    const [timer, setTimer] = useState(30);
    const { value } = route.params || {};
    let otpInput = useRef(null);
    const { myTheme } = useSelector(state => state.root.user) || {};
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    useEffect(() => {
        if (timer <= 0) {
            // Timer has reached zero, navigate or take appropriate action here
            console.log('Timer has reached zero');
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
        console.log(value, 'gggggggggggggggg');
        const obj = {
            email: value,
        };
        if (obj) {
            console.log('true');
            const result = await SendOTP(obj);
            console.log(result.data.status, "agyaaa otp")
            //   if (result.data.status === true) {

            //   } else {
            //     Alert.alert(result?.data?.message);
            //   }
        }
    };
    const resetTimer = () => {
        handleVerification();
        setTimer(30); // Reset the timer to 30 seconds
    };
    const handleCodeFilled = otp => {
        console.log('OTP Entered:', otp);
        // You can perform any actions with the entered OTP here
    };
    return (
        <SafeAreaView style={[container, { backgroundColor: theme.colors.background }]}>
            <NavHeader navigation={navigation} title={'OTP Verification'} />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
                        backgroundColor: theme.colors.tabs,
                        borderRadius: 10,
                        height: RF(54),
                        width: RF(54),
                    }}
                    handleTextChange={text => {
                        if (text.length === 4) {
                            handleCodeFilled(text); // Handle OTP input completion
                        }
                    }}
                    ref={e => (otpInput = e)}></OTPTextInput>

                <View style={[FlexDirection, { marginBottom: RF(30) }]}>
                    <Text
                        onPress={() => resetTimer()}
                        disabled={timer == 0 ? false : true}
                        style={{
                            ...smalltext,
                            fontSize: RF(14),
                            color: timer == 0 ? 'black' : 'lightgray',
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
                    screen={() => navigation.navigate('UpdatePassword')}
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
