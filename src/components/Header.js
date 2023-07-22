import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { setIsLogin } from '../redux/reducers/userReducers';
import { store } from '../redux/store';

const Header = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };
  return (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../assets/original.png')}
      />
      <TouchableOpacity onPress={() => store.dispatch(setIsLogin(false))}>
        <Image
          resizeMode="contain"
          style={styles.logoutIcon}
          source={require('../assets/power.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    tintColor: 'red',
    height: 60,
    width: '50%',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    with: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  logoutIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, tintColor: 'red'
  },
});
