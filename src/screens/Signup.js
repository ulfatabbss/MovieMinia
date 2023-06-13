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
import React, {useState} from 'react';
import {Primary} from '../utillis/colors';
import {Formik} from 'formik';
import {LoginValidationSchema} from '../utillis/validationSchema';

const Signup = ({navigation}) => {
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
  const initialValues = {
    email: '',
    password: '',
  };
  const handleLogin = values => {
    const obj = {
      username: values.email,
      password: values.password,
    };
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      validationSchema={LoginValidationSchema}
      onSubmit={values => {
        console.log('values', values);
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
          <ImageBackground
            source={{
              uri: 'https://www.logitheque.com/en/wp-content/uploads/sites/6/2019/07/netflix-image.jpg',
            }}
            resizeMode="cover"
            style={styles.bgImage}>
            <View style={styles.overlay}>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Image
                  style={{height: 250, width: 250}}
                  source={require('../assets/logo.png')}></Image>
              </View>
              <View style={styles.formWrapper}>
                <View style={styles.form}>
                  <Text style={styles.normalTxt}>Sign Up</Text>
                  <View style={styles.nameFields}>
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="grey"
                      onChangeText={handleChange('firstName')}
                      style={styles.inputnameTxt}
                    />
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="grey"
                      style={styles.inputnameTxt}
                    />
                  </View>
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
                      {flexDirection: 'row', alignItems: 'center'},
                    ]}>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="grey"
                      value={values.password}
                      autoCapitalize={'none'}
                      onChangeText={handleChange('password')}
                      secureTextEntry={PasswordVisibility}
                      style={{width: 250}}
                    />
                    <TouchableOpacity onPress={TogglePassword}>
                      <Image
                        style={{height: 22, width: 22, tintColor: Primary}}
                        source={eyeIcon}></Image>
                    </TouchableOpacity>
                  </View>
                  {errors.email && touched.email ? (
                    <Text style={styles.errors}>{errors.password}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.signinBtn}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.signinTxt}>Sign Up</Text>
                  </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 15,
                      }}>
                      <Text style={styles.signupTxt}>
                        Already have an account?{' '}
                      </Text>
                      <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Signin')}>
                      <Text style={[styles.signupTxt, {color: '#E7442E'}]}>
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
  container: {backgroundColor: '#fff', flex: 1},
  bgImage: {flex: 1},
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
    backgroundColor: '#000',
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
    fontWeight: 'bold',
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
    backgroundColor: '#E7442E',
    width: '100%',
  },
  signupTxt: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ccc',
    fontWeight: 500,
  },
  nameFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errors:{
    fontSize: 12,
    marginStart:10,
    color: Primary,
  },
});
