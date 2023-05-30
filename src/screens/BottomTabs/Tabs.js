import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import TvShowes from '../TvShowes';
import Cartoons from '../Cartoons';
import Find from '../PlayList';
import {Primary, black} from '../../utillis/colors';
import PlayList from '../PlayList';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Primary,
          tabBarInactiveBackgroundColor: black,
          tabBarActiveBackgroundColor: black,
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: focused ? '#E7442E' : 'gray',
                  }}
                  source={require('../../assets/home.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#E7442E' : 'gray',
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
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: focused ? '#E7442E' : 'gray',
                  }}
                  source={require('../../assets/tvshow.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#E7442E' : 'gray',
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
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: focused ? '#E7442E' : 'gray',
                  }}
                  source={require('../../assets/cartoon.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#E7442E' : 'gray',
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
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: focused ? '#E7442E' : 'gray',
                  }}
                  source={require('../../assets/playlist.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#E7442E' : 'gray',
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
