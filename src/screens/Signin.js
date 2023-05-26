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

const Signin = ({navigation}) => {
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
              <Text style={styles.normalTxt}>Sign In</Text>
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
              <TouchableOpacity style={styles.signinBtn} 
              onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.signinTxt}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupTxt}>New to MovieMania? Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {backgroundColor: 'red', flex: 1},
  bgImage: {flex: 1},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
  },
  form: {
    height: 400,
    width: '90%',
    backgroundColor: '#000',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
  },
  normalTxt: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  inputTxt: {
    width: '95%',
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
    width: '95%',
  },
  signupTxt: {
    fontSize: 15,
    textAlign: 'center',
    margin: 15,
    color: '#ccc',
    fontWeight: 500,
  },
});
