import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import TvShowes from '../TvShowes';
import Cartoons from '../Cartoons';
import Find from '../PlayList';
import {Primary, black, gray, white} from '../../utillis/colors';
import PlayList from '../PlayList';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View style={{flex: 1,}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Primary,
          tabBarInactiveBackgroundColor: 'rgba(51,51,51,1)',
           tabBarActiveBackgroundColor: 'rgba(51,51,51,0.9)',
          
          borderRadius:25,
          tabBarStyle: {
            borderTopWidth: 0,
            bottom:15,
            width:'70%',
            left:'15%',
            borderRadius:25,
            justifyContent: 'center',
            position: 'absolute',
            overflow: 'hidden',
            backgroundColor: 'transparent',
        
          },
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', borderRadius:25,backgroundColor:focused?'rgba(255,255,255,0.2)':'rgba(51,51,51,0.9)',width:'100%',height:'100%'}}>
                <Image
                  style={{
                    height: focused ? 23: 20,
                    width: focused ? 23: 20,
                    tintColor: focused ? white : white,
                  }}
                  source={require('../../assets/home.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? white : white,
                    fontSize: 10,
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="TvShowes"
          component={TvShowes}
          borderRadius={true}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', borderRadius:25,backgroundColor:focused?'rgba(255,255,255,0.2)':'rgba(51,51,51,0.9)',width:'100%',height:'100%'}}>
                <Image
                  style={{
                    height: focused ? 23: 20,
                    width: focused ? 23: 20,
                    tintColor: focused ? white : white,
                  }}
                  source={require('../../assets/tvshow.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? white : white,
                    fontSize: 10,
                  }}>
                  TV Showes
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Cartoons"
          component={Cartoons}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:25,backgroundColor:focused?'rgba(255,255,255,0.2)':'rgba(51,51,51,0.9)',width:'100%',height:'100%'}}>
                <Image
                  style={{
                    height: focused ? 23: 20,
                    width: focused ? 23: 20,
                    tintColor: focused ? white : white,
                  }}
                  source={require('../../assets/cartoon.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? white : white,
                    fontSize: 10,
                  }}>
                  Cartoons
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="PlayList"
          component={PlayList}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:25,backgroundColor:focused?'rgba(255,255,255,0.2)':'rgba(51,51,51,0.9)',width:'100%',height:'100%'}}>
                <Image
                  style={{
                    height: focused ? 23: 20,
                    width: focused ? 23: 20,
                    tintColor: focused ? white : white,
                  }}
                  source={require('../../assets/playlist.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? white : white,
                    fontSize: 10,
                  }}>
                  PlayList
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
