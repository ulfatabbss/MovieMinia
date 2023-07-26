import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput, Modal, Pressable
} from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { setIsLogin } from '../redux/reducers/userReducers';
import { store } from '../redux/store';

const Header = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.header}>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to logout? </Text>
            <View
              style={{
                flexDirection: 'row',
                height: '35%',
                width: '100%',
                position: 'absolute',
                bottom: 0,
                alignSelf: 'flex-end',
                borderColor: '#fff',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: 'green', borderTopRightRadius: 10 },
                ]}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                onPress={() => store.dispatch(setIsLogin(false))}
                style={[
                  styles.button,
                  { backgroundColor: 'red', borderTopLeftRadius: 10 },
                ]}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../assets/original.png')}
      />
      <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
        <Image
          resizeMode="contain"
          style={styles.logoutIcon}
          source={require('../assets/power.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    tintColor: 'red',
    height: 60,
    width: '50%',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    with: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  logoutIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, tintColor: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
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
  }, modalText: {
    marginTop: 15,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
