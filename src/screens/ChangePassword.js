import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../components/NavHeader';
import {container} from '../utillis/styles';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import darkTheme from '../utillis/theme/darkTheme';
import lightTheme from '../utillis/theme/lightTheme';
import HeadingTitle from '../components/HeadingTitle';
import {Formik} from 'formik';
import {hide, lock, show} from '../assets';
import {RF} from '../utillis/theme/Responsive';
import {changePassword} from '../utillis/validationSchema';
import {Primary} from '../utillis/colors';
import Button from '../components/Button';
const ChangePassword = ({navigation}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
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
  const initialValues = {password: '', confirmPassword: ''};
  const handleVerification = values => {
    const passwordValue = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    if (passwordValue) {
      console.log('true');
      //   navigation.navigate('OTPverification', {value: values});
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      validationSchema={changePassword}
      onSubmit={values => {
        // console.log('values', values);
        handleVerification(values);
      }}>
      {({values, errors, touched, handleChange, handleSubmit}) => (
        <View style={[container, {backgroundColor: theme.colors.background}]}>
          <NavHeader navigation={navigation} />
          <HeadingTitle
            title1={'CHANGE PASSWORD'}
            titile2={'Please enter a new password!'}
          />

          <View style={styles.centeredView}>
            <View
              style={[
                styles.inputTxt,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.tabs,
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme.colors.text,
                }}
                source={lock}
              />
              <TextInput
                placeholder="Enter New Password"
                placeholderTextColor="grey"
                value={values.password}
                autoCapitalize={'none'}
                onChangeText={handleChange('password')}
                secureTextEntry={PasswordVisibility}
                style={{
                  width: '85%',
                  height: '100%',
                  paddingLeft: RF(10),
                  color: theme.colors.text,
                  backgroundColor: theme.colors.tabs,
                  fontSize: RF(14),
                }}
              />

              <TouchableOpacity onPress={TogglePassword}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: theme.colors.eyeIcon,
                  }}
                  source={eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}
            <View
              style={[
                styles.inputTxt,
                {
                  backgroundColor: theme.colors.tabs,
                },
              ]}>
              <Image
                style={{
                  height: RF(20),
                  width: RF(20),
                  tintColor: theme.colors.text,
                }}
                source={lock}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="grey"
                value={values.confirmPassword}
                autoCapitalize={'none'}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry={PasswordVisibility}
                style={{
                  width: '85%',
                  height: '100%',
                  paddingLeft: RF(10),
                  color: theme.colors.text,
                  backgroundColor: theme.colors.tabs,
                  fontSize: RF(14),
                }}
              />

              <TouchableOpacity onPress={TogglePassword}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: theme.colors.eyeIcon,
                  }}
                  source={eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errors}>{errors.confirmPassword}</Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Button title={'Save Password'} screen={() => handleSubmit()} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  errors: {
    fontSize: 12,
    marginStart: 10,
    marginVertical: 10,
    color: Primary,
  },
  inputTxt: {
    width: '100%',
    height: RF(50),
    paddingHorizontal: 10,
    borderRadius: 50,
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    width: '100%',
    height: RF(110),
    justifyContent: 'space-between',
    marginTop: RF(20),
  },
});
