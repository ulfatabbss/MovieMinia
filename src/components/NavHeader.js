import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { HP, RF, WP } from '../utillis/theme/Responsive';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import darkTheme from '../utillis/theme/darkTheme';
import lightTheme from '../utillis/theme/lightTheme';
import { backArrow, backErrow } from '../assets';
import heading from '../utillis/fonts';
import { h4 } from '../utillis/styles';
const NavHeader = ({ navigation, title }) => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <View
            style={{ ...styles.V2, backgroundColor: theme.colors.topbar }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={[styles.img1, { tintColor: theme.colors.icon }]}
                    resizeMode='contain'
                    source={backErrow}></Image>

            </TouchableOpacity>
            <Text
                style={[h4, { marginLeft: '5%', color: theme.colors.text }]}>{title}

            </Text>
        </View>
    );
};

export default NavHeader;

const styles = StyleSheet.create({
    img1: {
        height: 25,
        width: 20,
        alignSelf: 'center'
    },
    V2: {
        flexDirection: 'row',
        width: WP(100),
        height: 60,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
    },
});