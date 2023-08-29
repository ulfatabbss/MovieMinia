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
import React, { useState } from 'react';
import { LoginValidationSchema } from '../utillis/validationSchema';
import { Formik } from 'formik';
import { Primary } from '../utillis/colors';
import { store } from '../redux/store';
import { setIsLogin, setUser } from '../redux/reducers/userReducers';
import { Login } from '../services/AppServices';
import Loader from '../components/Loader';
import { useToast } from "react-native-toast-notifications";
const Signin = ({ navigation }) => {
  const Toast = useToast();
  const [eyeIcon, setEyeIcon] = useState(require('../assets/close.png'));
  const [PasswordVisibility, setPasswordVisibility] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const TogglePassword = () => {
    if (eyeIcon == require('../assets/close.png')) {
      setEyeIcon(require('../assets/open.png'));
      setPasswordVisibility(false);
    } else if (eyeIcon == require('../assets/open.png')) {
      setEyeIcon(require('../assets/close.png'));
      setPasswordVisibility(true);
    }
  };


  const guestLogin = async () => {
    setIsLoading(true)
    const guestCredentials = {
      email: 'guest@example.com',
      password: 'Guest#123',
    };
    try {
      const response = await Login(guestCredentials);
      if (response.data.status == true) {
        Toast.show("⭐ Welcom to Movie Minia.....!", {
          type: "success",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
        store.dispatch(setUser(response.data.user))
        console.log(response.data);
        store.dispatch(setIsLogin(true));
      } else {
        Toast.show("🚧 Login credentials are incorrect...!", {
          type: "error",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
      }
    } catch (error) {
      Toast.show(error, {
        type: "error",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    } finally {
      setIsLoading(false);
    }
  }
  const initialValues = {
    email: '',
    password: '',
  };
  const handleLogin = async (values) => {
    setIsLoading(true);
    const obj = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await Login(obj);
      if (response.data.status == true) {
        store.dispatch(setUser(response.data.user))
        console.log(response.data);
        Toast.show("⭐ Welcom to Movie Minia.....!", {
          type: "success",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
        store.dispatch(setIsLogin(true));
      } else {
        Toast.show(" 🚧 Login credentials are incorrect .....!", {
          type: "error",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
      }
    } catch (error) {
      Toast.show(error, {
        type: "error",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <Loader />
    );
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
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={{
              marginTop: '25%',
              height: 150,
              width: 200,
              tintColor: 'red',
              alignSelf: 'center',
            }}
            source={require('../assets/logo1.png')}
          />

          <View style={styles.formWrapper}>

            <Text style={styles.normalTxt}>Sign In</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="grey"
              value={values.email}
              autoCapitalize={'none'}
              onChangeText={handleChange('email')}
              style={styles.inputTxt}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errors}>{errors.email}</Text>
            ) : null}
            <View
              style={[
                styles.inputTxt,
                { flexDirection: 'row', alignItems: 'center' },
              ]}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="grey"
                value={values.password}
                autoCapitalize={'none'}
                onChangeText={handleChange('password')}
                secureTextEntry={PasswordVisibility}
                style={{ width: '90%', color: 'white' }}
              />

              <TouchableOpacity onPress={TogglePassword}>
                <Image
                  style={{ height: 22, width: 22, tintColor: Primary }}
                  source={eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.email && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.signinBtn}
              onPress={() => handleSubmit()}>
              <Text style={styles.signupTxt}>Sign In</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <View style={styles.line} />
              <Text>Or</Text>
              <View style={styles.line} />
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={styles.guestbtn}
                onPress={() => guestLogin()}>
                <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={require('../assets/Auth/google.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.guestbtn}
                onPress={() => guestLogin()}>
                <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={require('../assets/Auth/facebook.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.guestbtn}
                onPress={() => guestLogin()}>
                <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={require('../assets/Auth/apple.png')} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text style={styles.signupTxt}>Don't have an Account? </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.signupTxt, { color: Primary }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik >
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  formWrapper: {
    width: '100%'
  },
  normalTxt: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
    fontFamily: 'BebasNeue-Regular',
  },
  inputTxt: {
    width: '95%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#333333',
    color: '#fff',
    marginTop: 10,
  },
  signinBtn: {
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Primary,
    width: '95%',
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
    height: 40, width: "20%"
  },
  line: {
    height: .5,
    width: '40%',
    backgroundColor: '#fff',
    marginVertical: 20, // Adjust this value to change the space above and below the line
  },
});

