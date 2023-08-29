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
        backgroundColor: "#F8F8F8",
      }}>
      <StatusBar hidden />
      <Image
        resizeMode="contain"
        style={{ height: 270, width: 270, tintColor: "red" }}
        source={require('../assets/applogo.png')}
      />
      <Text style={{ fontWeight: '400', color: 'black', fontSize: 15, position: 'absolute', bottom: 50, fontFamily: 'Raleway', letterSpacing: -0.165, fontStyle: 'normal' }}>Powered By</Text>
      <Image resizeMode='contain' style={{ height: 30, width: 100, bottom: 10, position: 'absolute' }} source={require('../assets/wblack.png')} />
    </SafeAreaView>
  );
};

export default Splash;
