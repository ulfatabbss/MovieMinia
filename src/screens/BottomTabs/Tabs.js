import React from 'react';
import { View, Image, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import TvShowes from '../TvShowes';
import Cartoons from '../Cartoons';
import PlayList from '../PlayList';
import { Primary } from '../../utillis/colors';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';

const Tab = createBottomTabNavigator();



const Tabs = () => {
  const {
    myTheme
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const TabIcon = ({ focused, source, text }) => (

    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.tabs,
        width: 70,
        height: 60,
        overflow: 'hidden',
      }}
    >
      <Image
        style={{
          height: focused ? 30 : 25,
          tintColor: focused ? '#720808' : theme.colors.icon,
        }}
        source={source}
        resizeMode="contain"
      />

      <Text
        style={{
          color: focused ? '#720808' : theme.colors.icon,
          textAlign: 'center',
          fontFamily: 'Poppins',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: '400',
        }}
      >
        {text}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            // backgroundColor: theme.colors.tabs,
          }}
        />
      )}
      <StatusBar backgroundColor={theme.colors.tabs}
        barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Primary,
          // tabBarInactiveBackgroundColor: theme.colors.tabs,
          // tabBarActiveBackgroundColor: theme.colors.tabs,
          tabBarStyle: {
            height: 60,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            overflow: 'hidden',
            backgroundColor: theme.colors.tabs,
            // boxShadow: '0px -3px 4px 0px rgba(0, 0, 0, 0.05)',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                source={require('../../assets/bottomTabs/fillhome.png')}
                text="Home"
              />
            ),
          }}
        />
        <Tab.Screen
          name="TvShowes"
          component={TvShowes}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                source={require('../../assets/bottomTabs/tv.png')}
                text="T.V & Drama"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cartoons"
          component={Cartoons}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                source={require('../../assets/bottomTabs/anim.png')}
                text="Anime"
              />
            ),
          }}
        />
        <Tab.Screen
          name="PlayList"
          component={PlayList}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                source={require('../../assets/bottomTabs/myplaylist.png')}
                text="My Playlist"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Tabs;
