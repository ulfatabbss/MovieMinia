import React from 'react';
import { View, Image, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import Dashboard from './Dashboard';
import TvShowes from './TvShowes';
import Cartoons from './Cartoons';
import PlayList from './PlayList';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { HP, RF, WP } from '../../utillis/theme/Responsive';


const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const {
    myTheme, loading
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const shimmerColors = ['#ebebeb', 'rgba(0, 0, 0, 0.1)', '#ebebeb'];

  const TabIcon = ({ focused, source, text }) => (

    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme?.colors?.tabs,
        width: HP(10),
        height: HP(10)
      }}
    >
      <Image
        style={{
          height: focused ? HP(4) : HP(3),
          tintColor: focused ? myTheme == 'lightTheme' ? theme?.colors?.primary : "white" : theme?.colors?.bottomicon,
        }}
        source={source}
        resizeMode="contain"
      />

      <Text
        style={{
          color: focused ? myTheme == 'lightTheme' ? theme?.colors?.primary : "white" : theme?.colors?.bottomicon,
          textAlign: 'center',
          fontFamily: 'Raleway-Medium',
          fontSize: RF(10)
        }}
      >
        {text}
      </Text>
    </View>
  );

  const PreIcon = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme?.colors?.tabs,
        width: 70,
        height: 60
      }}
    >
      <ShimmerPlaceholder duration={2000} shimmerColors={shimmerColors}
        style={{
          height: 30, width: 30, borderRadius: 15,
        }}
      />

      <ShimmerPlaceholder duration={2000} shimmerColors={shimmerColors}
        style={{
          height: 10, width: 40, borderRadius: 10, marginTop: 3,
        }}
      />

    </View>
  )
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.colors?.tabs }}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme?.colors?.tabs,
          }}
        />
      )}
      <StatusBar backgroundColor={theme?.colors?.tabs}
        barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          // tabBarActiveTintColor: Primary,
          tabBarStyle: {
            height: HP(8),
            width: WP(100),
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            overflow: 'hidden',
            backgroundColor: theme?.colors?.tabs,
            boxShadow: 'rgba(0, 0, 0, 0.5)',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderTopColor: myTheme == 'lightTheme' ? 'white' : 'black'
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: loading ? PreIcon : ({ focused }) => (
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
            tabBarIcon: loading ? PreIcon : ({ focused }) => (
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
            tabBarIcon: loading ? PreIcon : ({ focused }) => (
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
            tabBarIcon: loading ? PreIcon : ({ focused }) => (
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
