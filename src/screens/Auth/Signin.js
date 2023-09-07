import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginValidationSchema} from '../../utillis/validationSchema';
import {Formik} from 'formik';
import {Primary} from '../../utillis/colors';
import {store} from '../../redux/store';
import {setIsLogin, setUser} from '../../redux/reducers/userReducers';
import {Login} from '../../services/AppServices';
import Loader from '../../components/Loader';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import {RF} from '../../utillis/theme/Responsive';
import {applogo, hide, lock, Message, show} from '../../assets';
import {Heading, smalltext} from '../../utillis/styles';
import {Secondary} from '../../utillis/theme';
import Button from '../../components/Button';
import CheckBox from '@react-native-community/checkbox';
import Logo from '../../components/Logo';
const Signin = ({navigation}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const Toast = useToast();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(show);
  const [PasswordVisibility, setPasswordVisibility] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    GoogleSignin.configure()
  },[])
  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo,"userinfooooooooooo")
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error)
        // play services not available or outdated
      } else {
        console.log(error)
        // some other error happened
      }
    }
  };
  const TogglePassword = () => {
    if (eyeIcon == show) {
      setEyeIcon(hide);
      setPasswordVisibility(false);
    } else if (eyeIcon == hide) {
      setEyeIcon(show);
      setPasswordVisibility(true);
    }
  };

  const guestLogin = async () => {
    setIsLoading(true);
    const guestCredentials = {
      email: 'guest@example.com',
      password: 'Guest#123',
    };
    try {
      const response = await Login(guestCredentials);
      if (response.data.status == true) {
        store.dispatch(setUser(response.data.user));
        console.log(response.data);
        store.dispatch(setIsLogin(true));
      }
    } catch (error) {
      Toast.show(error, {
        type: 'error',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const initialValues = {
    email: '',
    password: '',
  };
  const handleLogin = async values => {
    setIsLoading(true);
    const obj = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await Login(obj);
      if (response.data.status == true) {
        store.dispatch(setUser(response.data.user));
        console.log(response.data);

        store.dispatch(setIsLogin(true));
      } else {
        // Toast.show(' 🚧 Login credentials are incorrect .....!', {
        //   type: 'error',
        //   placement: 'bottom',
        //   duration: 3000,
        //   offset: 30,
        //   animationType: 'zoom-in',
        // });
      }
    } catch (error) {
      Toast.show(error, {
        type: 'error',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      validationSchema={LoginValidationSchema}
      onSubmit={values => {
        // console.log('values', values);
        handleLogin(values);
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
            {backgroundColor: theme.colors.background},
          ]}>
          <Logo />
          <View style={styles.formWrapper}>
            <Text
              style={{
                ...Heading,
                color: theme.colors.text,
                fontSize: RF(16),
                fontFamily: 'Raleway-Bold',
              }}>
              Sign In
            </Text>
            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.tabs,
                },
              ]}>
              <Image style={{height: RF(20), width: RF(20)}} source={Message} />
              <TextInput
                placeholder="Enter your email"
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
                  backgroundColor: theme.colors.tabs,
                },
              ]}>
              <Image style={{height: RF(20), width: RF(20)}} source={lock} />
              <TextInput
                placeholder="Password"
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
                  style={{height: 22, width: 22, tintColor: theme.colors.text}}
                  source={eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.email && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}

            {/* <TouchableOpacity
              style={styles.signinBtn}
              onPress={() => handleSubmit()}>
              <Text style={styles.signupTxt}>Sign In</Text>
            </TouchableOpacity> */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
              <CheckBox
                boxType="circle"
                onFillColor={theme.colors.text}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text
                style={{
                  ...smalltext,
                  fontFamily: 'Raleway-Regular',
                  fontSize: RF(12),
                  color: theme.colors.text,
                }}>
                Remember me
              </Text>
              <Text
                style={{
                  ...smalltext,
                  fontFamily: 'Raleway-SemiBold',
                  fontSize: RF(12),
                  position: 'absolute',
                  color: Secondary,
                  right: 0,
                }}>
                Forgot Password
              </Text>
            </View>

            <Button title={'Sign In'} screen={() => handleSubmit()} />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={[styles.line, {backgroundColor: theme.colors.text}]}
              />
              <Text style={{color: theme.colors.text}}>Or</Text>
              <View
                style={[styles.line, {backgroundColor: theme.colors.text}]}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={GoogleLogin}
                style={[styles.guestbtn, {backgroundColor: theme.colors.tabs}]}>
                <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/google.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.guestbtn, {backgroundColor: theme.colors.tabs}]}
                onPress={() => guestLogin()}>
                <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/facebook.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.guestbtn, {backgroundColor: theme.colors.tabs}]}
                onPress={() => guestLogin()}>
                <Image
                  style={styles.guestIcons}
                  source={require('../../assets/Auth/apple.png')}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
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
                Don't have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text
                  style={{
                    ...smalltext,
                    color: Secondary,
                    fontSize: RF(12),
                    marginLeft: RF(5),
                    fontFamily: 'Raleway-Bold',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Signin;

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
  guestIcons: {height: '100%', width: '100%'},
});
