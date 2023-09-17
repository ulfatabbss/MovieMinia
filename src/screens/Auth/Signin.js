import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert, Keyboard
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import { LoginValidationSchema } from '../../utillis/validationSchema';
import { Formik } from 'formik';
import { Primary } from '../../utillis/colors';
import { store } from '../../redux/store';
import { setIsFacebook, setIsGoogle, setIsLogin, setUser } from '../../redux/reducers/userReducers';
import { Login, Register, checkUserExist } from '../../services/AppServices';
import Loader from '../../components/Loader';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import { HP, RF, WP } from '../../utillis/theme/Responsive';
import { hide, lock, Message, show } from '../../assets';
import { Heading, smalltext } from '../../utillis/styles';
import { Secondary } from '../../utillis/theme';
import Button from '../../components/Button';
import CheckBox from '@react-native-community/checkbox';
import Logo from '../../components/Logo';
const Signin = ({ navigation }) => {
  const { myTheme } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(show);
  const [PasswordVisibility, setPasswordVisibility] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
  const TogglePassword = () => {
    if (eyeIcon == show) {
      setEyeIcon(hide);
      setPasswordVisibility(false);
    } else if (eyeIcon == hide) {
      setEyeIcon(show);
      setPasswordVisibility(true);
    }
  };
  const initialValues = {
    email: '',
    password: '',
  };
  const handleLogin = async values => {
    setIsLoading(true);
    try {
      const obj = {
        email: values.email,
        password: values.password,
      };
      const response = await Login(obj);
      if (response.data.status == true) {
        dispatch(setUser(response.data.user));
        console.log(response.data);

        dispatch(setIsLogin(true));
      } else {
        Alert.alert('⚠️ Login credentials incorrect, please try again .....!');

      }
    } catch (error) {
      Alert.alert('⚠️ Check your internet connection and try again .....!');

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GoogleSignin.configure()

  }, [])
  const GoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo.user, "userinfooooooooooo")
      const userExists = await checkIfUserExists(userInfo.user.email);
      if (userExists) {
        // User exists, log them in
        const loginObj = {
          email: userInfo.user.email,
          password: userInfo.user.id, // You may need to provide a default password
        };
        const response = await Login(loginObj);
        if (response.data.status == true) {
          dispatch(setUser(response.data.user));
          dispatch(setIsGoogle(true))
          // console.log(response.data);
          dispatch(setIsLogin(true));
        } else {
          Alert.alert('⚠️ Login credentials incorrect, please try again .....!');
        }
      } else {
        // User doesn't exist, register them
        console.log("Signup");
        const registerObj = {
          name: userInfo.user.name,
          email: userInfo.user.email,
          password: userInfo.user.id, // You may need to provide a default password
        };
        Register(registerObj)
          .then(async ({ data }) => {
            if (data.status == true) {
              console.log(data);
              // dispatch(setIsLogin(true));
            } else {
              Alert.alert('⚠️ Credentials incorrect, please try again .....!');
            }
          })
          .catch(error => {
            Alert.alert('⚠️ Check your internet connection and try again .....!');
          })
      }
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
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfUserExists = async (email) => {
    try {
      // Perform an API call or database query to check if the user exists
      // Return true if the user exists, false otherwise
      const obj = {
        email: email
      }
      const response = await checkUserExist(obj);
      return response.data.status;
    } catch (error) {
      // Handle any errors that occur during the check
      console.error('Error checking user existence:', error);
      return false; // Assuming the user doesn't exist in case of an error
    }
  };

  const onFacebookButtonPress = async () => {
    setIsLoading(true);
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Fetch user profile data
      const responseInfoCallback = async (error, result) => {
        if (error) {
          console.log('Error fetching user data:', error);
          throw 'Error fetching user data';
        } else {
          // You can access user profile data in result
          // console.log('User data:', result);
          const userExists = await checkIfUserExists(result.email);
          if (userExists) {
            // User exists, log them in
            const loginObj = {
              email: result.email,
              password: result.id, // You may need to provide a default password
            };
            const response = await Login(loginObj);
            if (response.data.status == true) {
              dispatch(setUser(response.user));
              dispatch(setIsFacebook(true))
              // console.log(response.data);
              dispatch(setIsLogin(true));
            } else {
              Alert.alert('⚠️ Login credentials incorrect, please try again .....!');
            }
          } else {
            // User doesn't exist, register them
            console.log("Signup");
            const registerObj = {
              name: result.name,
              email: result.email,
              password: result.id, // You may need to provide a default password
            };
            Register(registerObj)
              .then(async ({ data }) => {
                if (data.status == true) {
                  console.log(data);
                  // dispatch(setIsLogin(true));
                } else {
                  Alert.alert('⚠️ Credentials incorrect, please try again .....!');
                }
              })
              .catch(error => {
                Alert.alert('⚠️ Check your internet connection and try again .....!');
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
            { backgroundColor: theme.colors.background },
          ]}>
          {logoVisible && <Logo />}
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
                  backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image style={{ height: RF(20), width: RF(20) }} source={Message} />
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
                  backgroundColor: theme.colors.tabs, elevation: 1, shadowOffset: .3
                },
              ]}>
              <Image style={{ height: RF(20), width: RF(20) }} source={lock} />
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
                  style={{ height: 22, width: 22, tintColor: theme.colors.text }}
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
              <Text onPress={() => navigation.navigate("ChangePassword")}
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

              <TouchableOpacity onPress={() => GoogleLogin()}
                style={[styles.guestbtn, { backgroundColor: theme.colors.tabs }]}>
                <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/google.png')}
                />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => onFacebookButtonPress()}
                style={[styles.guestbtn, { backgroundColor: theme.colors.tabs }]}>
                <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/facebook.png')}
                />
              </TouchableOpacity>
              {/* <View style={{ ...styles.guestbtn, overflow: 'hidden' }}>
                <LoginButton
                  style={{
                    height: RF(35),
                    width: '100%', backgroundColor: '#4267B2'
                  }}
                  onLoginFinished={
                    (error, result) => {
                      if (error) {
                        Alert.alert("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        Alert.alert("login is cancelled.");
                      } else {

                        AccessToken.getCurrentAccessToken().then(
                          (data) => {
                            let accessToken = data.accessToken
                            Alert.alert(accessToken.toString())
                            console.log(data, "helllllllo i am your data");
                            const responseInfoCallback = (error, result) => {
                              if (error) {
                                console.log(error)
                                Alert.alert('Error fetching data: ' + error.toString());
                              } else {
                                console.log(result)
                                Alert.alert('Success fetching data: ' + result.toString());
                              }
                            }

                            const infoRequest = new GraphRequest(
                              '/me',
                              {
                                accessToken: accessToken,
                                parameters: {
                                  fields: {
                                    string: 'email,name,first_name,middle_name,last_name'
                                  }
                                }
                              },
                              responseInfoCallback
                            );

                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start()
                          }
                        )
                      }
                    }
                  }
                  onLogoutFinished={() => Alert.alert("logout.")} />
              </View> */}

              {/* <Image
                  style={styles.guestIcons}
                  resizeMode={'contain'}
                  source={require('../../assets/Auth/facebook.png')}
                /> */}
              {/* </LoginButton> */}
              {/* <LoginButton
                style={{ height: HP(5), width: WP(95), borderRadius: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      Alert.alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      Alert.alert("login is cancelled.");
                    } else {

                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          let accessToken = data.accessToken
                          Alert.alert(accessToken.toString())
                          console.log(data, "helllllllo i am your data");
                          const responseInfoCallback = (error, result) => {
                            if (error) {
                              console.log(error)
                              Alert.alert('Error fetching data: ' + error.toString());
                            } else {
                              console.log(result)
                              Alert.alert('Success fetching data: ' + result.toString());
                            }
                          }

                          const infoRequest = new GraphRequest(
                            '/me',
                            {
                              accessToken: accessToken,
                              parameters: {
                                fields: {
                                  string: 'email,name,first_name,middle_name,last_name'
                                }
                              }
                            },
                            responseInfoCallback
                          );

                          // Start the graph request.
                          new GraphRequestManager().addRequest(infoRequest).start()
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => Alert.alert("logout.")} /> */}
              {Platform.OS === 'ios' &&
                <TouchableOpacity
                  style={[styles.guestbtn, { backgroundColor: theme.colors.tabs }]}
                >
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
    borderRadius: 20, elevation: 1, shadowOffset: .3
  },
  line: {
    height: 1,
    width: '40%',
    backgroundColor: '#fff',
    marginVertical: 20, // Adjust this value to change the space above and below the line
  },
  guestIcons: { height: '100%', width: '100%' },
});
