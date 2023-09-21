import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tabs from '../screens/BottomTabs/Tabs';
import Player from '../screens/Others/Player';
import MovieDiscription from '../screens/Others/MovieDiscription';
import ExpandMovies from '../screens/Others/ExpandMovies';
import Player1 from '../screens/Others/Player1';
import CustomDrawerContent from '../components/CustomDrawerConten';
import SearchMovie from '../screens/Others/SearchMovie';
import { useSelector } from 'react-redux';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
import { useTheme } from 'react-native-paper';
import Notification from '../screens/Others/Notification';
import Settings from '../screens/Settings/Settings';
import AddReview from '../screens/ReviewScreens/AddReview';
import Review from '../screens/ReviewScreens/SeeReview';
import Profile from '../screens/Auth/Profile';
import EditProfile from '../screens/Auth/EditProfile';
import Terms from '../screens/Settings/Terms';
import Faq from '../screens/Settings/FAQ';
import PasswordSettings from '../screens/Auth/ResetPassword';
import OTPverification from '../screens/Auth/OtpVerification';
import ChangePassword from '../screens/Auth/ChangePassword';
import { WP } from '../utillis/theme/Responsive';
import DeleteAccount from '../screens/Settings/DeleteAccount';
import UpdatePassword from '../screens/Auth/UpdatePassword';
import Policy from '../screens/Settings/Policy';
import RewardedAdsScreen from '../screens/Ads/Rewarded';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MyDrawer = ({ navigation }) => {
  const {
    myTheme
  } = useSelector((state) => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: theme?.colors?.rightBar,
        width: WP(60),
        borderTopRightRadius: 30, borderBottomRightRadius: 30
      },
    }}
      drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="MovieDiscription" component={MovieDiscription} />
      <Stack.Screen name="ExpandMovies" component={ExpandMovies} />
      <Stack.Screen name="Player1" component={Player1} />
      <Stack.Screen name="SearchMovie" component={SearchMovie} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Policy" component={Policy} />
      <Stack.Screen name="PasswordSettings" component={PasswordSettings} />
      <Stack.Screen name="OTPverification" component={OTPverification} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="RewardedAdsScreen" component={RewardedAdsScreen} />

    </Stack.Navigator>
  );
};

export default MainStack;
