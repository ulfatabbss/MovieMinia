import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { secondary } from '../utillis/colors';

const Splash = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
      }}>
      <StatusBar hidden />
      <Image
        resizeMode="contain"
        style={{ height: 400, width: 400, tintColor: "red" }}
        source={require('../assets/logo1.png')}
      />
      <Text style={{ color: 'white', fontSize: 12, position: 'absolute', bottom: 50 }}>Powered By</Text>
      <Image resizeMode='contain' style={{ height: 30, width: 100, bottom: 10, position: 'absolute' }} source={require('../assets/whitelogo.png')} />
    </SafeAreaView>
  );
};

export default Splash;
