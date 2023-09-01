import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {RF} from '../utillis/theme/Responsive';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import darkTheme from '../utillis/theme/darkTheme';
import lightTheme from '../utillis/theme/lightTheme';
import {backArrow} from '../assets';
const NavHeader = ({navigation}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: RF(24),
          width: RF(24),
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            tintColor: theme.colors.text,
          }}
          source={backArrow}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  header: {
    height: RF(80),
    width: '100%',
    justifyContent: 'flex-end',
  },
});
