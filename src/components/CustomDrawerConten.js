import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setGuest, setIsFacebook, setIsGoogle, setIsLogin, setTheme } from '../redux/reducers/userReducers';
import { HP, RF, WP } from '../utillis/theme/Responsive';
import { useTheme } from 'react-native-paper';
import { store } from '../redux/store';
import { Primary, white } from '../utillis/colors';
import { Secondary, White } from '../utillis/theme';
import { caution } from '../assets';
import HeadingText from './CustomText';
const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { myTheme, user, isGuest, google, facebook } = useSelector((state) => state.root.user);
  const [textColor, setTextColor] = useState(myTheme == 'darkTheme' ? 'white' : 'black')
  const theme = useTheme(myTheme == 'darkTheme' ? 'lightTheme' : 'darkTheme');
  const [logOutModalVisible, setIsLogOutModalVisible] = useState(false)
  const toggleTheme = async () => {
    const newTheme = myTheme == 'darkTheme' ? 'lightTheme' : 'darkTheme';
    dispatch(setTheme(newTheme));
    setTextColor(newTheme == 'darkTheme' ? 'white' : 'black')
  };
  const handleLogout = () => {
    dispatch(setGuest(false))
    dispatch(setIsGoogle(false))
    dispatch(setIsFacebook(false))
    dispatch(setIsLogin(false))
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.tabs, borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
      <View style={{ flex: 1 }}>
        {logOutModalVisible ? <View style={styles.modal_FadeView} /> : null}
        <Modal animationType="slide" transparent={true} visible={logOutModalVisible}><View style={styles.modalContainer}>
          <View style={styles.modalCard}>
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
            <View style={styles.button_View}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogout()}>
                <HeadingText
                  title={'Yes'}
                  semi_bold
                  size={16}
                  color={White}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.signUp_Button]}
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
        <TouchableOpacity style={styles.profileContainer} disabled={isGuest || google || facebook} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileImageWrapper}>
            <Image
              style={styles.profileImage}
              source={{ uri: isGuest ? "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=626&ext=jpg&uid=R28842868&ga=GA1.2.332396238.1691144532&semt=ais" : user?.profilePicture }}
            />
            <Text style={{ ...styles.profileName, color: textColor }}>{isGuest ? 'Guest User' : user.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme} style={styles.othercontainer}>
          <Image
            style={{ ...styles.logoutImage }}
            source={require('../assets/them.png')}
          />
          <Text style={{ ...styles.otherText, color: textColor }}>Switch Theme</Text>
        </TouchableOpacity>
        {
          !isGuest &&
          <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.othercontainer}>
            <Image
              style={{ ...styles.logoutImage, tintColor: textColor }}
              source={require('../assets/settings.png')}
            />
            <Text style={{ ...styles.otherText, color: textColor }}>Settings</Text>
          </TouchableOpacity>
        }

      </View>
      {/* Other content */}
      <TouchableOpacity style={styles.bottomContainer} onPress={() => setIsLogOutModalVisible(true)}>
        <Image resizeMode='contain' style={{ ...styles.logoutImage, tintColor: textColor }} source={require('../assets/logout.png')} />
        <Text style={{ ...styles.logoutText, color: textColor }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  profileContainer: {
    height: 100,
    borderBottomColor: '#E1E4E8',
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  profileImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center'
  },
  profileImage: {
    width: WP(16),
    height: HP(8),
    borderRadius: 100,
  },
  profileName: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
    width: WP(40),
    fontSize: RF(16), textTransform: 'uppercase'

  },
  logoutImage: {
    height: HP(3),
    width: WP(10), resizeMode: 'contain',
  },
  logoutText: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
    fontSize: RF(16)
  }, bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 3,
    borderTopColor: '#E1E4E8',
    paddingVertical: 20
  },
  othercontainer: {
    padding: 10,
    flexDirection: 'row', alignItems: 'center', gap: 10
  }, otherText: {
    color: '#313131',
    fontFamily: 'Raleway-Regular',
    fontSize: RF(13)
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
    borderColor: Secondary, elevation: 5
  },
});
