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
import { setIsLogin } from '../redux/reducers/userReducers';
import { store } from '../redux/store';

const Header = ({navigation}) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <View style={styles.category}>
          <TextInput
            placeholder="Search"
            color="black"
            placeholderTextColor={'#898E9A'}
            style={styles.searchTxt}></TextInput>
          <Image
            style={styles.categoryImg}
            source={require('../assets/search.png')}
          />
        </View>

        <TouchableOpacity onPress={()=>store.dispatch(setIsLogin(false))}>
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
    justifyContent: 'space-around'
  },
  category: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginRight:10,

  },
  categoryImg: {height: 20, width: 20,  tintColor: 'gray'},
  searchTxt: {width: '80%',},
  logoutIcon: {
    width: 25,
    height: 25,
    tintColor: '#E7442E',
    marginRight:10
  },
});
