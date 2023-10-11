import React, { useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import heading from '../../utillis/fonts';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, caution, dellUser, faq, passSettings, policy, terms } from '../../assets';
import { resetUserState, setGuest, setIsFacebook, setIsGoogle, setIsLogin, setLoading, setTheme } from '../../redux/reducers/userReducers';
import { Heading, button, button_View, modalCard, modalContainer, signUp_Button } from '../../utillis/styles';
import { Primary, Secondary, White } from '../../utillis/theme';
import { RF } from '../../utillis/theme/Responsive';
import HeadingText from '../../components/CustomText';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Settings = ({ navigation }) => {
    const { myTheme, user, isGuest, isGoogle, isFacebook } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [logOutModalVisible, setIsLogOutModalVisible] = useState(false)
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            await GoogleSignin.signOut();
            console.log("hellllllo");
            dispatch(setIsGoogle(false))
        } catch (error) {
            console.error(error);
        }
        dispatch(resetUserState());


    }
    const renderSettingItem = (icon, label, onPress) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <Image style={{ ...styles.settingIcon, tintColor: theme?.colors?.icon }} resizeMode="contain" source={icon} />
            <Text style={{ ...Heading, color: theme?.colors?.text, fontSize: RF(16) }}>{label}</Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: theme?.colors?.topbar }}>
            <StatusBar backgroundColor={theme?.colors?.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            {logOutModalVisible ? <View style={styles.modal_FadeView} /> : null}
            <Modal animationType="slide" transparent={true} visible={logOutModalVisible}><View style={modalContainer}>
                <View style={modalCard}>
                    <Image style={{ height: RF(90), width: RF(90) }} source={caution} />
                    <HeadingText title={'Come back Soon!'} bold size={20} top={5} />
                    <HeadingText
                        title={
                            'Are you Sure You Want to Logout?'
                        }
                        regular
                        size={16}
                        top={10}
                        alignCenter
                    />
                    <View style={button_View}>
                        <TouchableOpacity
                            style={button}
                            onPress={() => handleLogout()}>
                            <HeadingText
                                title={'Yes'}
                                semi_bold
                                size={16}
                                color={White}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[button, signUp_Button]}
                            onPress={() => setIsLogOutModalVisible(!logOutModalVisible)}>
                            <HeadingText
                                title={'Cancel'}
                                semi_bold
                                size={16}
                                color={Secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backButton, { tintColor: theme?.colors?.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={{ ...Heading, color: theme?.colors?.text }}>Settings</Text>
            </View>
            <View style={{ ...styles.content, backgroundColor: theme?.colors?.background }}>
                <View style={styles.settingsList}>
                    {!isGoogle && !isFacebook && renderSettingItem(passSettings, 'Password Settings', () => navigation.navigate('PasswordSettings'))}
                    {renderSettingItem(terms, 'Terms & Conditions', () => navigation.navigate('Terms'))}
                    {renderSettingItem(policy, 'Privacy Policy', () => navigation.navigate('Policy'))}
                    {renderSettingItem(faq, 'FAQs', () => navigation.navigate('Faq'))}
                    {renderSettingItem(require('../../assets/logout.png'), 'Logout', () => { setIsLogOutModalVisible(true) })}
                </View>
            </View>
            <View style={{ ...styles.deleteAccount, borderTopColor: '#E1E4E8' }}>
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
        gap: RF(10)
        // justifyContent: 'space-between',
    },
    backButton: {
        height: RF(25),
        width: RF(20),
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
        marginVertical: RF(10),
        gap: RF(10),
        alignItems: 'center'
    },
    settingIcon: {
        height: RF(20),
        width: RF(20),
    },
    settingLabel: {
        ...heading.h5,
        fontWeight: '500',
        marginLeft: '2%',
    },
    themeSetting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: RF(10),
    },
    themeSettingContent: {
        flexDirection: 'row', gap: RF(10)
    },
    themeSwitch: {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
    },

    deleteAccount: {
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: RF(2),
        position: 'absolute',
        bottom: 0,
        height: RF(60),
        alignItems: 'center', paddingHorizontal: RF(10)
    },
    deleteAccountButton: {
        flexDirection: 'row', gap: RF(10), alignItems: 'center'
    },
    deleteAccountIcon: {
        height: RF(25),
        width: RF(25)
    },
});

export default Settings;
