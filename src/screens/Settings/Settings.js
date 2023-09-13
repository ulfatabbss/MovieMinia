import React, { useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import heading from '../../utillis/fonts';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, caution, dellUser, faq, passSettings, policy, terms } from '../../assets';
import { setIsLogin, setLoading, setTheme } from '../../redux/reducers/userReducers';
import { Heading } from '../../utillis/styles';
import { DeleteAccountApi } from '../../services/AppServices';
import { Primary, Secondary, White } from '../../utillis/theme';
import { RF } from '../../utillis/theme/Responsive';
import HeadingText from '../../components/CustomText';

const Settings = ({ navigation }) => {
    const { myTheme, user } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false)


    const handleDeleteAccount = async () => {

        const id = user._id
        // const id = '64c3e3b0eb8bd300eb4cad71'
        const result = await DeleteAccountApi(id)
        if (result.data.status == true) {
            dispatch(setIsLogin(false))
            setModalVisible(false)
        }
        else {
            setModalVisible(false)
            Alert.alert('something went wronggggg!')
        }
        // dispatch(setLoading(false))
        // console.log(result.data, "uyghihiouioj");
    }
    const renderSettingItem = (icon, label, onPress) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <Image style={{ ...styles.settingIcon, tintColor: theme.colors.icon }} resizeMode="contain" source={icon} />
            <Text style={{ ...Heading, color: theme.colors.text, fontSize: 16 }}>{label}</Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.topbar }}>

            {modalVisible ? <View style={styles.modal_FadeView} /> : null}
            <Modal animationType="slide" transparent={true} visible={modalVisible}><View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                    <Image style={{ height: RF(90), width: RF(90) }} source={caution} />
                    <HeadingText title={'Alert'} bold size={20} top={5} />
                    <HeadingText
                        title={
                            'Are you sure to delete this Account?'
                        }
                        regular
                        size={16}
                        top={10}
                        alignCenter
                    />
                    <View style={styles.button_View}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDeleteAccount}>
                            <HeadingText
                                title={'Ok'}
                                semi_bold
                                size={16}
                                color={White}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.signUp_Button]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <HeadingText
                                title={'Cancel'}
                                semi_bold
                                size={16}
                                color={Secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View></Modal>

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
                    {renderSettingItem(terms, 'Terms & Conditions', () => navigation.navigate('Terms'))}
                    {renderSettingItem(policy, 'Privacy Policy', () => navigation.navigate('Policy'))}
                    {renderSettingItem(faq, 'FAQs', () => navigation.navigate('Faq'))}
                    {renderSettingItem(require('../../assets/logout.png'), 'Logout', () => { })}
                </View>
            </View>

            <View style={{ ...styles.deleteAccount, borderTopColor: '#E1E4E8' }}>
                <TouchableOpacity style={styles.deleteAccountButton} onPress={() => setModalVisible(true)}>
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
    modal_FadeView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 500,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalCard: {
        height: RF(300),
        width: '100%',
        borderRadius: RF(30),
        backgroundColor: White,
        padding: 20,
        alignItems: 'center',
    },
    button_View: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        marginTop: RF(40),
    },
    button: {
        height: RF(40),
        width: '45%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Primary,
    },
    signUp_Button: {

        backgroundColor: White,
        borderColor: Secondary,
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
