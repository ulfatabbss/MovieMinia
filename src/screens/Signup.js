import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView, Keyboard
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Primary } from '../utillis/colors';
import { Formik } from 'formik';
import { SignUpValidationSchema } from '../utillis/validationSchema';
import { ActivityIndicator } from 'react-native';
import { store } from '../redux/store';
import { setIsLogin } from '../redux/reducers/userReducers';
import { Register } from '../services/AppServices';
const Signup = ({ navigation }) => {
  const [eyeIcon, setEyeIcon] = useState(require('../assets/close.png'));
  const [PasswordVisibility, setPasswordVisibility] = useState(true);
  const TogglePassword = () => {
    if (eyeIcon == require('../assets/close.png')) {
      setEyeIcon(require('../assets/open.png'));
      setPasswordVisibility(false);
    } else if (eyeIcon == require('../assets/open.png')) {
      setEyeIcon(require('../assets/close.png'));
      setPasswordVisibility(true);
    }
  };
  const [logoVisible, setLogoVisible] = useState(true);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setLogoVisible(false)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setLogoVisible(true)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [])
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const handlSignUp = values => {
    setLoading(true);
    const obj = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    Register(obj)
      .then(async ({ data }) => {
        if (data.status == true) {
          store.dispatch(setIsLogin(true));
          ToastAndroid.showWithGravity(
            'Your account details have been saved.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
        else {
          ToastAndroid.showWithGravity(
            'This form has error',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }

      }).finally(() => setLoading(false));

  };
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'red'} />
      </SafeAreaView>
    );
  }
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      validationSchema={SignUpValidationSchema}
      onSubmit={values => {
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
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: 'https://www.logitheque.com/en/wp-content/uploads/sites/6/2019/07/netflix-image.jpg',
            }}
            resizeMode="cover"
            style={styles.bgImage}>
            <View style={styles.overlay}>
              {logoVisible && <Image
                resizeMode="contain"
                style={{
                  marginTop: '10%',
                  height: 150,
                  width: 200,
                  tintColor: 'red',
                  alignSelf: 'center',
                }}
                source={require('../assets/logo1.png')}
              />}
              <View style={[styles.formWrapper, { paddingTop: logoVisible ? null : Platform.OS == 'ios' ? "10%" : "20%" }]}>
                <View style={styles.form}>
                  <Text style={styles.normalTxt}>Sign Up</Text>
                  <View style={styles.nameFields}>
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="grey"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      style={styles.inputnameTxt}
                    />
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="grey"
                      style={styles.inputnameTxt}
                    />
                  </View>
                  {errors.name && touched.name ? (
                    <Text style={styles.errors}>{errors.name}</Text>
                  ) : null}
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
                      style={{ width: "90%", color: 'white' }}
                    />
                    <TouchableOpacity onPress={TogglePassword}>
                      <Image
                        style={{ height: 22, width: 22, tintColor: Primary }}
                        source={eyeIcon}></Image>
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                  <View
                    style={[
                      styles.inputTxt,
                      { flexDirection: 'row', alignItems: 'center' },
                    ]}>
                    <TextInput
                      placeholderTextColor="grey"
                      autoCapitalize={'none'}
                      placeholder="*********"
                      value={values.confirmPassword}
                      inputTitle={'confirmPassword'}
                      onChangeText={handleChange('confirmPassword')}
                      secureTextEntry={PasswordVisibility}
                      style={{ width: "100%", color: 'white' }}
                    />
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errors}>{errors.confirmPassword}</Text>
                  )}
                  <TouchableOpacity
                    style={styles.signinBtn}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.signupTxt}>Sign Up</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 15,
                    }}>
                    <Text style={styles.signupTxt}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Signin')}>
                      <Text style={[styles.signupTxt, { color: 'red' }]}>
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  bgImage: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'column',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 50,
    paddingTop: 30,
  },
  normalTxt: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
    textAlign: 'left',
    fontFamily: 'BebasNeue-Regular',
  },
  inputTxt: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#333333',
    color: '#fff',
    marginTop: 10,

  },
  inputnameTxt: {
    width: '49%',
    height: 50,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#333333',
    color: '#fff',
    marginTop: 10,
  },
  signinBtn: {
    height: 50,
    color: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Primary,
    width: '100%',
  },
  signupTxt: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ccc',
    fontFamily: 'BebasNeue-Regular',
  },
  nameFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'BebasNeue-Regular',
  },
  errors: {
    marginTop: 2,
    fontSize: 8,
    marginStart: 10,
    color: Primary,
    fontFamily: 'BebasNeue-Regular',
  },
});
