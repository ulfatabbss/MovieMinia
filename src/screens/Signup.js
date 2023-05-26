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
import React from 'react';

const Signup = ({navigation}) => {
  return (
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
                style={styles.inputTxt}
                // value={email}
                // onChangeText={validate => setEmail(validate)}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry
                style={styles.inputTxt}
                // value={password}
                // onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.signinBtn}
                onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.signinTxt}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Signin')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 15,
                  }}>
                  <Text style={styles.signupTxt}>Already have an account?  </Text>
                  <Text style={[styles.signupTxt, {color: '#E7442E'}]}>
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    paddingHorizontal:20,
    justifyContent: 'center',
    paddingBottom:50,
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
    padding: 10,
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
});
