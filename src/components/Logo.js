import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { applogo } from '../assets';
import { RF } from '../utillis/theme/Responsive';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';

const Logo = () => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <View
            style={{
                height: RF(145),
                width: RF(200),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <View
                style={{
                    height: RF(100),
                    width: RF(100),
                    borderRadius: 100,
                    backgroundColor: '#fff',
                    elevation: 1,
                }}>
                <Image
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 100,
                        borderColor: 'red',
                        backgroundColor: theme.colors.tabs,
                        alignSelf: 'center',
                        tintColor: theme.colors.logo,
                    }}
                    source={applogo}
                />
            </View>
        </View>
    );
};

export default Logo;

const styles = StyleSheet.create({});