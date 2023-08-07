import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
const Header2 = ({ navigation, text }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{
        height: 25, width: '10%', borderRadius: 15, justifyContent: 'center', alignItems: 'center'
      }}>
        <Image resizeMode='contain' source={require('../assets/backf.png')} style={{ height: 20, width: 15 }} />
      </TouchableOpacity>
      <Text numberOfLines={1}
        style={styles.headerTxt}>
        {text}
      </Text>

    </View>
  );
};

export default Header2;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, justifyContent: 'space-between'
    , borderBottomWidth: .5, borderBottomColor: 'white'
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginStart: 20,
  },
  headerContainerTxt: { width: '80%', alignItems: 'center', },
  headerTxt: {
    width: '90%',
    fontSize: 18, color: 'white'
  },
});