import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, Alert
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import { RF } from '../../utillis/theme/Responsive';
import HeadingTitle from '../../components/HeadingTitle';
import NavHeader from '../../components/NavHeader';
import { Message } from '../../assets';
import Button from '../../components/Button';
import { container } from '../../utillis/styles';
import { Formik } from 'formik';
import { Primary } from '../../utillis/colors';
import { otpVerification } from '../../utillis/validationSchema';
import { SendOTP } from '../../services/AppServices';
import Loader from '../../components/Loader';
const ChangePassword = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { myTheme = 'lightTheme' } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
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
                    navigation.navigate("OTPverification", { value: values.email });
                } else {
                    Alert.alert(
                        result?.data?.message
                    )
                }
            }
            setIsLoading(false)
        } catch {
            Alert.alert('⚠️ Check your internet connection and try again .....!');
        }
    };
    if (isLoading) {
        return <Loader />;
    }
    return (
        <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={otpVerification}
            onSubmit={values => {
                // console.log('values', values);
                handleVerification(values);
            }}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
                <View style={[container, { backgroundColor: theme.colors.background }]}>
                    <NavHeader navigation={navigation} title={'Email conformation'} />
                    <HeadingTitle
                        // title1={'RESET PASSWORD'}
                        titile2={'Please enter your email to request a password reset!'}
                    />
                    <View
                        style={[styles.inputView, { backgroundColor: theme.colors.tabs }]}>
                        <Image
                            style={{
                                height: RF(20),
                                width: RF(20),
                                tintColor: theme.colors.icon,
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
                                { backgroundColor: theme.colors.tabs, color: theme.colors.text },
                            ]}
                        />
                    </View>
                    {errors.email && touched.email && (
                        <Text style={styles.errors}>{errors.email}</Text>
                    )}
                    <View style={styles.centeredView}>
                        <Button title={'Send OTP'} screen={() => handleSubmit()} />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: RF(20),
        borderRadius: 50,
        backgroundColor: '#333333',
        color: '#fff',
    },
    emailInput: {
        width: '85%',
        paddingLeft: RF(10),
        height: '100%',
        fontSize: RF(14),
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 20
    },
    errors: {
        fontSize: 12,
        marginStart: 10,
        color: Primary,
    },
});
