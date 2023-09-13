import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { container, FlexDirection, smalltext } from '../../utillis/styles';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import { RF } from '../../utillis/theme/Responsive';
import NavHeader from '../../components/NavHeader';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import { otpBack } from '../../assets';
import HeadingTitle from '../../components/HeadingTitle';
import Button from '../../components/Button';
import { Secondary } from '../../utillis/theme';
const OTPverification = ({ navigation, route }) => {
    const [timer, setTimer] = useState(30);
    const { value } = route.params || {};
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
    const resetTimer = () => {
        setTimer(30); // Reset the timer to 30 seconds
    };
    return (
        <ScrollView style={[container, { backgroundColor: theme.colors.background }]}>
            <NavHeader navigation={navigation} />
            <Image
                style={{ height: RF(300), width: '100%' }}
                source={otpBack}
                resizeMode={'contain'}
            />
            <HeadingTitle
                title1={'Hi there!'}
                titile2={`Please enter the 4 digit OTP we just sent on  ${value}!`}
            />
            {/* <OTPInputView
                style={{ width: '100%', height: RF(100) }}
                pinCount={4}
                keyboardType={'phone-pad'}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                    // console.log(`Code is ${code}, you are good to go!`);
                }}
            /> */}
            {/* <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          paddingHorizontal: 10,
          fontSize: 16,
        }}
        keyboardType="numeric"
        maxLength={4}
        value={otp}
        onChangeText={(text) => setOTP(text)}
      />
      <Button title="Clear" onPress={clearText} /> */}
            <View style={[FlexDirection, { marginBottom: RF(30) }]}>
                <Text
                    // onPress={() => resetTimer()}
                    disabled={timer == 0 ? false : true}
                    style={{
                        ...smalltext,
                        fontSize: RF(14),
                        color: timer == 0 ? '#000' : 'gray',
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
                screen={() => navigation.navigate('ChangePassword')}
            />
        </ScrollView>
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
});