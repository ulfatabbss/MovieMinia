import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {White} from '../utillis/theme';
import {RF} from '../utillis/theme/Responsive';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';

const MyWrapper = ({children}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {children}
    </View>
  );
};

export default MyWrapper;

const styles = StyleSheet.create({
  container: {flex: 1, padding: RF(20)},
});
