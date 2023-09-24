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
import { setIsLogin, setUser } from '../../redux/reducers/userReducers';
import { Register } from '../../services/AppServices';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Signup = ({ navigation }) => {
  const { myTheme } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const dispatch = useDispatch();
  const [eyeIcon, setEyeIcon] = useState(show);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
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
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const handlSignUp = values => {
    setIsLoading(true);
    const obj = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    Register(obj)
      .then(async ({ data }) => {
        if (data.status == true) {
          dispatch(setUser(data?.data))
          dispatch(setIsLogin(true));
        } else {
          Alert.alert('⚠️ Credentials incorrect, please try again .....!');
        }
      })
      .catch(error => {
        Alert.alert('⚠️ Check your internet connection and try again .....!');
      })
      .finally(() => setIsLoading(false));
  };
  const GoogleLogin = async () => {
    try {
      setIsLoading(true);
      await checkGooglePlayServices();
      const userInfo = await signInWithGoogle();
      const userExists = await checkIfUserExists(userInfo?.user?.email);
      if (userExists) {
        await handleGoogleLogin(userInfo);
      } else {
        await handleRegister(userInfo);
      }
    } catch (error) {
      Alert.alert('⚠️ An error occurred: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkGooglePlayServices = async () => {
    try {
      await GoogleSignin.hasPlayServices();
    } catch (error) {
      Alert.alert('Google Play services are not available');
      throw new Error('Google Play services are not available');
    }
  };

  const signInWithGoogle = async () => {
    try {
      return await GoogleSignin.signIn();
    } catch (error) {
      Alert.alert('Failed to sign in with Google')
      throw new Error('Failed to sign in with Google');
    }
  };

  const handleGoogleLogin = async (userInfo) => {
    try {
      const loginObj = {
        email: userInfo?.user?.email,
        password: userInfo?.user?.id,
      };
      const response = await Login(loginObj);
      if (response?.data?.status == true) {
        dispatch(setUser(response?.data?.user));
        dispatch(setIsGoogle(true));
        dispatch(setIsLogin(true));
      } else {
        Alert.alert('⚠️ Login credentials incorrect, please try again ...!');
      }
    } catch (error) {
      Alert.alert(`'Failed to handle login: '  ${error.message}`)
      throw new Error('Failed to handle login: ' + error.message);
    }
  };

  const handleRegister = async (userInfo) => {
    try {
      const registerObj = {
        name: userInfo?.user?.name,
        email: userInfo?.user?.email,
        password: userInfo?.user?.id,
        profilePicture: userInfo?.user?.photo,
      };
      const { data } = await Register(registerObj);
      if (data.status == true) {
        dispatch(setUser(data?.data));
        dispatch(setIsLogin(true));
        dispatch(setIsGoogle(true));
      } else {
        Alert.alert('⚠️ Credentials incorrect, please try again ...!');
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        Alert.alert('⚠️ Check your internet connection and try again ...!');
      } else {
        Alert.alert(`'Failed to handle registration: ' ${error.message}`)
        throw new Error('Failed to handle registration: ' + error.message);
      }
    }
  };


  const checkIfUserExists = async (email) => {
    try {
      const obj = {
        email: email
      }
      const response = await checkUserExist(obj);
      return response?.data?.status;
    } catch (error) {
      Alert.alert(`'Error checking user existence:', ${error}`)
      return false;
    }
  };

  const onFacebookButtonPress = async () => {
    setIsLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert('Cancelled the login process')
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const responseInfoCallback = async (error, result) => {
        if (error) {
          Alert.alert(error)
          console.log('Error fetching user data:', error);
          throw 'Error fetching user data';
        } else {
          const userExists = await checkIfUserExists(result?.email);
          if (userExists) {
            const loginObj = {
              email: result?.email,
              password: result?.id,
            };
            const response = await Login(loginObj);
            if (response.data.status == true) {
              dispatch(setUser(response?.data?.user));
              dispatch(setIsFacebook(true))
              dispatch(setIsLogin(true));
            } else {
              Alert.alert('⚠️ Login credentials incorrect, please try again .....!');
            }
          } else {
            console.log("Signup");
            const registerObj = {
              name: result.name,
              email: result.email,
              password: result.id,
            };
            Register(registerObj)
              .then(async ({ data }) => {
                if (data.status == true) {
                  console.log(data, "this is my facebook data");
                  // dispatch(setIsLogin(true));
                } else {
                  Alert.alert('⚠️ Credentials incorrect, please try again .....!');
                }
              })
              .catch(error => {
                if (error.message === 'Network Error') {
                  Alert.alert('⚠️ Check your internet connection and try again .....!');
                } else {
                  Alert.alert('⚠️ An error occurred. Please try again later.');
                }
              })
          }
          // You can access user profile picture like this:
          // const profilePictureUrl = `https://graph.facebook.com/${result.id}/picture?type=large`;

          // Now, you can use the user data as needed in your app
        }
      };

      const graphRequest = new GraphRequest(
        '/me',
        {
          parameters: {
            fields: {
              string: 'id,email,name,first_name,last_name,picture.type(large)',
            },
          },
        },
        responseInfoCallback
      );

      // Start the graph request
      new GraphRequestManager().addRequest(graphRequest).start();
    } catch (error) {
      console.error('Facebook login error:', error);
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
            { backgroundColor: theme?.colors?.background },
          ]}>
          {logoVisible && <Logo />}
          <View style={{ ...styles.formWrapper, marginTop: logoVisible ? null : "10%" }}>
            <Text
              style={{
                ...Heading,
                color: theme?.colors?.text,
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
                  backgroundColor: theme?.colors?.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme?.colors?.text,
                }}
                source={require('../../assets/appIcons/user.png')}
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
                  color: theme?.colors?.text,
                  backgroundColor: theme?.colors?.tabs,
                  fontSize: RF(14),
                }}
              />
            </View>
            {errors.name && touched.name && (
              <Text style={styles.errors}>{errors.name}</Text>
            )}
            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme?.colors?.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme?.colors?.text,
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
                  backgroundColor: theme?.colors?.tabs,
                  color: theme?.colors?.text,
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
                  backgroundColor: theme?.colors?.tabs,
                  elevation: 1,
                  shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme?.colors?.text,
                }}
                source={lock}
              />
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="grey"
                value={values.password}
                autoCapitalize={'none'}
                onChangeText={handleChange('password')}
                secureTextEntry={passwordVisibility}
                style={{
                  width: '80%', // Adjust the width as needed
                  height: '100%',
                  paddingLeft: RF(10),
                  color: theme?.colors?.text,
                  backgroundColor: theme?.colors?.tabs,
                  fontSize: RF(14),
                }}
              />

              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  style={{ height: 22, width: 22, tintColor: theme?.colors?.text }}
                  source={passwordVisibility ? eyeIcon : hide}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}

            {/* Confirm Password Field */}
            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme?.colors?.tabs,
                  elevation: 1,
                  shadowOffset: .3
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme?.colors?.text,
                }}
                source={lock}
              />
              <TextInput
                placeholder="Confirm Your Password"
                placeholderTextColor="grey"
                value={values.confirmPassword}
                autoCapitalize={'none'}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry={confirmPasswordVisibility}
                style={{
                  width: '80%', // Adjust the width as needed
                  height: '100%',
                  paddingLeft: RF(10),
                  color: theme?.colors?.text,
                  backgroundColor: theme?.colors?.tabs,
                  fontSize: RF(14),
                }}
              />

              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Image
                  style={{ height: RF(20), width: RF(20), tintColor: theme?.colors?.text }}
                  source={confirmPasswordVisibility ? eyeIcon : hide}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errors}>{errors.confirmPassword}</Text>
            )}
            <View style={{ marginTop: RF(10) }}>
              <Button title={'Sign Up'} screen={() => handleSubmit()} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={[styles.line, { backgroundColor: theme?.colors?.text }]}
              />
              <Text style={{ color: theme?.colors?.text }}>Or</Text>
              <View
                style={[styles.line, { backgroundColor: theme?.colors?.text }]}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity onPress={() => GoogleLogin()}
                style={[styles.guestbtn, { backgroundColor: "#fff", overflow: 'hidden' }]}>
                <Image
                  style={styles.guestIcons}
                  // resizeMode={'contain'}
                  source={require('../../assets/Auth/google.png')}
                />
                <Text
                  style={{
                    ...smalltext,
                    color: Secondary,
                    fontSize: RF(14), textAlign: 'center', width: '80%',
                    fontFamily: 'Raleway-Bold',
                  }}>Sign in with Google</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => onFacebookButtonPress()}
                style={[styles.guestbtn, { elevation: 1, shadowOffset: .3 }]}
              >
                <Image
                  style={{ height: '100%', width: '100%' }}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/facebook.png')}
                />
              </TouchableOpacity> */}
              {Platform.OS === 'ios' &&
                <TouchableOpacity
                  style={[styles.guestbtn, { elevation: 1, shadowOffset: .3 }]}>
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
                  color: theme?.colors?.text,
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
    // height: RF(400),
    // justifyContent: 'space-between',
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
    color: '#fff', marginVertical: 5
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
    height: RF(40),
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100, elevation: 1, shadowOffset: .3, flexDirection: 'row'
  },
  line: {
    height: 1,
    width: '40%',
    backgroundColor: '#fff',
    marginVertical: 20, // Adjust this value to change the space above and below the line
  },
  guestIcons: { height: '100%', width: '10%' },
});