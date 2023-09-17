// Import statements (organized)
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, hide, show } from '../../assets';
import { h4, h5, h6 } from '../../utillis/styles';
import NavHeader from '../../components/NavHeader';
import { HP } from '../../utillis/theme/Responsive';
import { text } from '../../utillis/styles'
const UpdatePassword = ({ navigation }) => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const [eyeIcon, setEyeIcon] = useState(show);
    const [PasswordVisibility, setPasswordVisibility] = useState(true);

    const TogglePassword = () => {
        if (eyeIcon == show) {
            setEyeIcon(hide);
            setPasswordVisibility(false);
        } else if (eyeIcon == hide) {
            setEyeIcon(show);
            setPasswordVisibility(true);
        }
    };
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.topbar }]}>
            {/* Header */}
            <NavHeader navigation={navigation} title={'CHANGE PASSWORD'} />

            {/* Change Password Form */}
            <View style={[styles.formContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={{ color: theme.colors.text, ...text, marginHorizontal: 20 }}>Please enter a new password!</Text>
                {/* New Password */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={theme.colors.text}
                        placeholder='New Password'
                        secureTextEntry={PasswordVisibility}

                    />
                    <TouchableOpacity onPress={() => TogglePassword()}>
                        <Image style={styles.passwordIcon} resizeMode='contain' source={eyeIcon} />
                    </TouchableOpacity>
                </View>

                {/* Confirm New Password */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={theme.colors.text}
                        placeholder='Confirm New Password'
                        secureTextEntry={PasswordVisibility}

                    />
                    <TouchableOpacity onPress={() => TogglePassword()}>
                        <Image style={styles.passwordIcon} resizeMode='contain' source={eyeIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Save Password Button */}
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Password</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    backIcon: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
    headerText: {
        ...h4,
        marginLeft: '5%',
    },
    formContainer: {
        height: '100%',
        paddingTop: HP(5)
    },
    title: {
        ...h5,
        fontWeight: '700',
        marginLeft: '7%',
        marginTop: '5%',
    },
    subtitle: {
        ...h6,
        fontWeight: '400',
        marginLeft: '7%',
        marginTop: '2%',
    },
    inputContainer: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between', elevation: 5
    },
    input: {
        ...h6,
        marginLeft: '5%',
    },
    passwordIcon: {
        height: 20,
        width: 20,
        marginRight: '5%',
    },
    saveButton: {
        height: 48,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: '#720808',
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        ...h5,
        fontWeight: '700',
        color: 'white',
    },
});

export default UpdatePassword;
