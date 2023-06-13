import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
const Header2 = ({navigation, text, color}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => { navigation.goBack(); }}
        style={styles.header}>
        <View style={{width: '12%'}}>
          <Image
            resizeMode="contain"
            style={[styles.icon, {tintColor: color}]}
            source={require('../assets/backErrow.png')}
          />
        </View>
        </TouchableOpacity>
        <View style={styles.headerContainerTxt}>
          <Text
            style={[styles.headerTxt,{color: color,}]}>
            {text}
          </Text>
        </View>
      
    </View>
  );
};

export default Header2;

const styles = StyleSheet.create({
  headerContainer:{
    width: '100%',
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginStart:20,
  },
  headerContainerTxt:{width: '80%', alignItems: 'center', },
  headerTxt:{
    
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});