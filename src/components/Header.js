import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { setIsLogin } from '../redux/reducers/userReducers';
import { store } from '../redux/store';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
const Header = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    myTheme
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    store.dispatch(setIsLogin(false));
    toggleModal();
  };
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View style={{ ...styles.header, backgroundColor: theme.colors.background }}>
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to logout?</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.noButton]}
                onPress={toggleModal}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.yesButton]}
                onPress={handleLogout}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={openDrawer}>
        <Image
          resizeMode="contain"
          style={[styles.logo, { tintColor: theme.colors.icon }]}
          source={require('../assets/hamebarger.png')}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchMovie')}>
          <Image
            resizeMode="contain"
            style={[styles.logoutIcon, { tintColor: theme.colors.icon }]}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            resizeMode="contain"
            style={[styles.logoutIcon, { tintColor: theme.colors.icon }]}
            source={require('../assets/notification.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  logo: {
    height: 25,
    width: 25,
    tintColor: '#313131', // Use tintColor for coloring images
  },
  logoutIcon: {
    width: 25,
    height: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
  },
  modalView: {
    height: 100,
    width: '60%',
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: 'gray',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  modalText: {
    marginTop: 15,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: '35%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    borderColor: '#fff',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
  },
  noButton: {
    backgroundColor: 'green',
    borderTopRightRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Header;
