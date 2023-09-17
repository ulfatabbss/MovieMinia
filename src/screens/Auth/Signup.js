import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Primary } from '../../utillis/colors';
import { Formik } from 'formik';
import { applogo, hide, lock, Message, show, user } from '../../assets';

import { SignUpValidationSchema } from '../../utillis/validationSchema';
import { store } from '../../redux/store';
import { setIsLogin } from '../../redux/reducers/userReducers';
import { Register } from '../../services/AppServices';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import Logo from '../../components/Logo';
import { Heading, smalltext } from '../../utillis/styles';
import Button from '../../components/Button';
import { RF } from '../../utillis/theme/Responsive';
import { Secondary } from '../../utillis/theme';
const Signup = ({ navigation }) => {
  const { myTheme } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const dispatch = useDispatch();
  const [eyeIcon, setEyeIcon] = useState(show);
  const [PasswordVisibility, setPasswordVisibility] = useState(true);
  const TogglePassword = () => {
    if (eyeIcon == show) {
      setEyeIcon(hide);
      setPasswordVisibility(false);
    } else if (eyeIcon == hide) {
      setEyeIcon(show);
      setPasswordVisibility(true);
    }
  };
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
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const handlSignUp = values => {
    setLoading(true);
    const obj = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    Register(obj)
      .then(async ({ data }) => {
        if (data.status == true) {
          console.log(data);
          dispatch(setIsLogin(true));
        } else {
          Alert.alert('⚠️ Credentials incorrect, please try again .....!');
        }
      })
      .catch(error => {
        Alert.alert('⚠️ Check your internet connection and try again .....!');
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      validationSchema={SignUpValidationSchema}
      onSubmit={values => {
        console.log(values);
        handlSignUp(values);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        isSubmitting,
        handleSubmit,
        dirty,
        setFieldValue,
        isValid,
      }) => (
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}>
          {logoVisible && <Logo />}
          <View style={{ ...styles.formWrapper, marginTop: logoVisible ? null : "20%" }}>
            <Text
              style={{
                ...Heading,
                color: theme.colors.text,
                fontSize: RF(16),
                fontFamily: 'Raleway-Bold',
              }}>
              Sign Up
            </Text>
            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme.colors.text,
                }}
                source={user}
              />
              <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor="grey"
                value={values.name}
                autoCapitalize={'none'}
                onChangeText={handleChange('name')}
                style={{
                  width: '85%',
                  height: '100%',
                  paddingLeft: RF(10),
                  color: theme.colors.text,
                  backgroundColor: theme.colors.tabs,
                  fontSize: RF(14),
                }}
              />
            </View>
            {errors.name && touched.email && (
              <Text style={styles.errors}>{errors.name}</Text>
            )}
            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme.colors.text,
                }}
                source={Message}
              />
              <TextInput
                placeholder="johndua@gmail.com"
                placeholderTextColor="grey"
                value={values.email}
                autoCapitalize={'none'}
                onChangeText={handleChange('email')}
                style={{
                  width: '85%',
                  paddingLeft: RF(10),
                  height: '100%',
                  backgroundColor: theme.colors.tabs,
                  color: theme.colors.text,
                  fontSize: RF(14),
                }}
              />
            </View>
            {errors.email && touched.email ? (
              <Text style={styles.errors}>{errors.email}</Text>
            ) : null}

            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme.colors.text,
                }}
                source={lock}
              />
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="grey"
                value={values.password}
                autoCapitalize={'none'}
                onChangeText={handleChange('password')}
                secureTextEntry={PasswordVisibility}
                style={{
                  width: '85%',
                  height: '100%',
                  paddingLeft: RF(10),
                  color: theme.colors.text,
                  backgroundColor: theme.colors.tabs,
                  fontSize: RF(14),
                }}
              />

              <TouchableOpacity onPress={TogglePassword}>
                <Image
                  style={{ height: 22, width: 22, tintColor: theme.colors.text }}
                  source={eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}
            <Button title={'Sign Up'} screen={() => handleSubmit()} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={[styles.line, { backgroundColor: theme.colors.text }]}
              />
              <Text style={{ color: theme.colors.text }}>Or</Text>
              <View
                style={[styles.line, { backgroundColor: theme.colors.text }]}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={[styles.guestbtn, { backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3 }]}
                onPress={() => guestLogin()}>
                <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/google.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.guestbtn, { backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3 }]}
                onPress={() => guestLogin()}>
                <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/facebook.png')}
                />
              </TouchableOpacity>
              {Platform.OS === 'ios' &&
                <TouchableOpacity
                  style={[styles.guestbtn, { backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3 }]}
                  onPress={() => guestLogin()}>
                  <Image
                    style={styles.guestIcons}
                    source={require('../../assets/Auth/apple.png')}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              }
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  ...smalltext,
                  color: theme.colors.text,
                  fontSize: RF(12),
                  fontFamily: 'Raleway-Bold',
                }}>
                Already have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text
                  style={{
                    ...smalltext,
                    color: Secondary,
                    fontSize: RF(12),
                    marginLeft: RF(5),
                    fontFamily: 'Raleway-Bold',
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RF(20),
    justifyContent: 'center',
  },
  formWrapper: {
    width: '100%',
    height: RF(400),
    justifyContent: 'space-between',
  },
  normalTxt: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
    fontFamily: 'BebasNeue-Regular',
  },
  inputTxt: {
    width: '100%',
    height: RF(45),
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#333333',
    color: '#fff',
  },
  signinBtn: {
    height: RF(50),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Primary,
    width: '100%',
  },
  signupTxt: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 500,
    fontFamily: 'BebasNeue-Regular',
  },
  errors: {
    fontSize: 12,
    marginStart: 10,
    color: Primary,
  },
  guestbtn: {
    height: RF(35),
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  line: {
    height: 1,
    width: '40%',
    backgroundColor: '#fff',
    marginVertical: 20, // Adjust this value to change the space above and below the line
  },
  guestIcons: { height: '100%', width: '100%' },
});