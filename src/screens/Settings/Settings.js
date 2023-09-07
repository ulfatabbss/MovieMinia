import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import heading from '../../utillis/fonts';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, dellUser, faq, passSettings, policy, terms } from '../../assets';
import { setTheme } from '../../redux/reducers/userReducers';
import { Heading } from '../../utillis/styles';

const Settings = ({ navigation }) => {
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        const newTheme = myTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme';
        dispatch(setTheme(newTheme));
    };

    const renderSettingItem = (icon, label, onPress) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <Image style={{ ...styles.settingIcon, tintColor: theme.colors.icon }} resizeMode="contain" source={icon} />
            <Text style={{ ...Heading, color: theme.colors.text }}>{label}</Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.topbar }}>
            <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backButton, { tintColor: theme.colors.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={{ ...Heading, color: theme.colors.text }}>Settings</Text>
            </View>
            <View style={{ ...styles.content, backgroundColor: theme.colors.background }}>
                <View style={styles.settingsList}>
                    {renderSettingItem(passSettings, 'Password Settings', () => navigation.navigate('PasswordSettings'))}
                    <View style={styles.themeSetting}>
                        <View style={styles.themeSettingContent}>
                            <Image style={[styles.settingIcon, { tintColor: theme.colors.icon }]} resizeMode="contain" source={require('../../assets/HeaderIcon/dark.png')} />
                            <Text style={{ ...Heading, color: theme.colors.text }}>Theme</Text>
                        </View>
                        <Switch
                            style={styles.themeSwitch}
                            trackColor={{ false: '#767577', true: '#C89B28' }}
                            thumbColor={'#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleTheme}
                            value={myTheme == 'darkTheme' ? false : true}
                        />
                    </View>
                    {renderSettingItem(terms, 'Terms & Conditions', () => navigation.navigate('Terms'))}
                    {renderSettingItem(policy, 'Privacy Policy', () => navigation.navigate('Policy'))}
                    {renderSettingItem(faq, 'FAQs', () => navigation.navigate('Faq'))}
                    {renderSettingItem(require('../../assets/logout.png'), 'Logout', () => { })}
                </View>
            </View>
            <View style={{ ...styles.deleteAccount, borderTopColor: theme.colors.icon }}>
                <TouchableOpacity style={styles.deleteAccountButton} onPress={() => navigation.navigate('DeleteAccount')}>
                    <Image
                        style={styles.deleteAccountIcon}
                        resizeMode="contain"
                        source={dellUser}
                    />
                    <Text style={{ ...Heading, color: 'red' }}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 10
        // justifyContent: 'space-between',
    },
    backButton: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
    headerText: {
        marginLeft: '5%',
        ...heading.h4,
    },
    content: {
        flex: 1,
        // backgroundColor: Primary,
    },
    settingsList: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%',
    },
    settingItem: {
        flexDirection: 'row',
        marginVertical: 10,
        gap: 10,
    },
    settingIcon: {
        height: 20,
        width: 20,
    },
    settingLabel: {
        ...heading.h5,
        fontWeight: '500',
        marginLeft: '2%',
    },
    themeSetting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    themeSettingContent: {
        flexDirection: 'row', gap: 10
    },
    themeSwitch: {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
    },
    deleteAccount: {
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: 2,
        position: 'absolute',
        bottom: 0,
        height: 60,
        alignItems: 'center', paddingHorizontal: 10

    },
    deleteAccountButton: {
        flexDirection: 'row', gap: 10
    },
    deleteAccountIcon: {
        height: 25,
        width: 25
    },
});

export default Settings;
