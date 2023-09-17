import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, hide, show } from '../../assets';
import { h4, h5, h6 } from '../../utillis/styles';
import NavHeader from '../../components/NavHeader';
import { HP } from '../../utillis/theme/Responsive';
import { text } from '../../utillis/styles';

// Import Formik and Yup
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserPasswordUpdate } from '../../services/AppServices';
import { setIsLogin } from '../../redux/reducers/userReducers';
import { data } from 'cheerio/lib/api/attributes';
import { store } from '../../redux/store';
import Loader from '../../components/Loader';

const UpdatePassword = ({ navigation, route }) => {
    const { myTheme, isLogin } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const [loading, setLoading] = useState(false);
    const { value } = route.params || {};

    const [newPasswordVisibility, setNewPasswordVisibility] = useState(true);
    const [confirmNewPasswordVisibility, setConfirmNewPasswordVisibility] = useState(true);

    const TogglePassword = (field) => {
        if (field === 'newPassword') {
            setNewPasswordVisibility(prevVisibility => !prevVisibility);
        } else if (field === 'confirmNewPassword') {
            setConfirmNewPasswordVisibility(prevVisibility => !prevVisibility);
        }
    };

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('New Password is required')
            .min(6, 'New Password must be at least 6 characters long'),
        confirmNewPassword: Yup.string()
            .required('Confirm New Password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    const handlePasswordChange = async (values) => {
        setLoading(true)
        const obj = {
            email: value,
            newPassword: values.newPassword
        }
        const result = await UserPasswordUpdate(obj)
        if (result.data.status == true) {
            if (isLogin) {
                console.log("login false");
                store.dispatch(setIsLogin(false))
            } else {
                console.log("login");
                navigation.replace('Signin')
            }
        } else {
            Alert.alert(result?.data?.message);
        }
        setIsLogin(false)
    };
    if (loading) {

        return <Loader />;
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.topbar }]}>
            {/* Header */}
            <NavHeader navigation={navigation} title={'CHANGE PASSWORD'} />

            {/* Change Password Form */}
            <Formik
                initialValues={{ newPassword: '', confirmNewPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => handlePasswordChange(values)}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <View style={[styles.formContainer, { backgroundColor: theme?.colors?.background }]}>
                        <Text style={{ color: theme?.colors?.text, ...text, marginHorizontal: 20 }}>Please enter a new password!</Text>

                        {/* New Password */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'gray'}
                                placeholder='New Password'
                                secureTextEntry={newPasswordVisibility}
                                onChangeText={handleChange('newPassword')}
                                value={values.newPassword}
                            />
                            <TouchableOpacity onPress={() => TogglePassword('newPassword')}>
                                <Image style={styles.passwordIcon} resizeMode='contain' source={newPasswordVisibility ? show : hide} />
                            </TouchableOpacity>
                        </View>
                        {touched.newPassword && errors.newPassword && (
                            <Text style={styles.errorText}>{errors.newPassword}</Text>
                        )}

                        {/* Confirm New Password */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'gray'}
                                placeholder='Confirm New Password'
                                secureTextEntry={confirmNewPasswordVisibility}
                                onChangeText={handleChange('confirmNewPassword')}
                                value={values.confirmNewPassword}
                            />
                            <TouchableOpacity onPress={() => TogglePassword("confirmNewPassword")}>
                                <Image style={styles.passwordIcon} resizeMode='contain' source={confirmNewPasswordVisibility ? show : hide} />
                            </TouchableOpacity>
                        </View>
                        {touched.confirmNewPassword && errors.confirmNewPassword && (
                            <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
                        )}

                        {/* Save Password Button */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                            <Text style={styles.saveButtonText}>Save Password</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, formContainer: {
        height: '100%',
        paddingTop: HP(5),
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5,
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    backIcon: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
    headerText: {
        ...h4,
        marginLeft: '5%',
    },
    formContainer: {
        height: '100%',
        paddingTop: HP(5)
    },
    title: {
        ...h5,
        fontWeight: '700',
        marginLeft: '7%',
        marginTop: '5%',
    },
    subtitle: {
        ...h6,
        fontWeight: '400',
        marginLeft: '7%',
        marginTop: '2%',
    },
    inputContainer: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between', elevation: 5
    },
    input: {
        ...h6,
        marginLeft: '5%',
    },
    passwordIcon: {
        height: 20,
        width: 20,
        marginRight: '5%',
    },
    saveButton: {
        height: 48,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: '#720808',
        position: 'absolute',
        bottom: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        ...h5,
        fontWeight: '700',
        color: 'white',
    },
});

export default UpdatePassword;
