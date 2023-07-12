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
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Primary,
          tabBarInactiveBackgroundColor: 'rgba(0,0,0,1)',
          tabBarActiveBackgroundColor: 'rgba(0,0,0,1)',
          borderRadius: 25,
          tabBarStyle: {
            height: 50,
            borderTopWidth: 0,
            bottom: 15,
            width: '80%',
            left: '10%',
            borderRadius: 25,
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: 'transparent',
            overflow: 'hidden',
          },
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#fff' : 'rgba(0,0,0,0)',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image
                  style={{
                    height: focused ? 18 : 15,
                    width: focused ? 18 : 15,
                    tintColor: focused ? 'red' : white,
                  }}
                  source={require('../../assets/home.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? 'red' : white,
                    fontSize: 8,
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
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  backgroundColor: focused ? '#fff' : 'rgba(0,0,0,0)',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image
                  style={{
                    height: focused ? 18 : 15,
                    width: focused ? 18 : 15,
                    tintColor: focused ? 'red' : white,
                  }}
                  source={require('../../assets/tvshow.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? 'red' : white,
                    fontSize: 8,
                  }}>
                  Showes
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
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  backgroundColor: focused ? '#fff' : 'rgba(0,0,0,0)',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image
                  style={{
                    height: focused ? 18 : 15,
                    width: focused ? 18 : 15,
                    tintColor: focused ? 'red' : white,
                  }}
                  source={require('../../assets/cartoon.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? 'red' : white,
                    fontSize: 8,
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
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  backgroundColor: focused ? '#fff' : 'rgba(0,0,0,0)',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image
                  style={{
                    height: focused ? 18 : 15,
                    width: focused ? 18 : 15,
                    tintColor: focused ? 'red' : white,
                  }}
                  source={require('../../assets/playlist.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? 'red' : white,
                    fontSize: 8,
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
