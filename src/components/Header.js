import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {SearchBar} from '@rneui/themed';
import {setIsLogin} from '../redux/reducers/userReducers';
import {store} from '../redux/store';

const Header = ({navigation}) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          style={[
            styles.logo,
            {tintColor: 'white', height: 24, width: 24, marginLeft: 10},
          ]}
          source={require('../assets/drawer.png')}
        />
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <TouchableOpacity onPress={() => store.dispatch(setIsLogin(false))}>
          <Image
            resizeMode="contain"
            style={styles.logoutIcon}
            source={require('../assets/logout.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logo: {
    width: 60,
    height: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    with: '100%',
    justifyContent: 'space-between',
  },
  category: {
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginRight: 10,
  },
  categoryImg: {height: 20, width: 20, tintColor: 'white'},
  searchTxt: {width: '80%', color: 'white'},
  logoutIcon: {
    width: 25,

    height: 25,
    tintColor: 'white',
    marginRight: 10,
  },
});
