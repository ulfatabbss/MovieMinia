import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import TvShowes from '../TvShowes';
import Cartoons from '../Cartoons';
import { Primary, white } from '../../utillis/colors';
import PlayList from '../PlayList';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <>
      {Platform.OS === 'ios' &&
        <View style={{
          width: "100%",
          height: 100,
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: "#000"
        }}
        />}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={'gray'} />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: Primary,
            tabBarInactiveBackgroundColor: 'rgba(0, 0, 0, 1)',
            tabBarActiveBackgroundColor: 'rgba(0, 0, 0, 1)',
            tabBarStyle: {
              height: 60,
              borderTopWidth: 0,
              width: '100%',
              justifyContent: 'center',
              position: 'absolute',
              paddingBottom: 0,
              borderTopWidth: 2,
              backgroundColor: 'rgba(0, 0, 0,1)',
              borderTopColor: 'red'
            },
          }}>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0,0,0,0)',
                    width: focused ? 80 : 50,
                    height: focused ? 70 : 50,
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45,
                    bottom: focused ? 10 : 0,
                    overflow: 'hidden',
                    borderTopWidth: focused ? 5 : null, borderColor: 'red'
                  }}>
                  <Image
                    style={{
                      height: focused ? 50 : 30,
                      width: focused ? 50 : 30,
                      tintColor: focused ? 'red' : white,
                    }}
                    source={require('../../assets/homef.png')}
                    resizeMode="contain"
                  />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="TvShowes"
            component={TvShowes}
            borderRadius={true}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0,0,0,0)',
                    width: focused ? 80 : 50,
                    height: focused ? 70 : 50,
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45,
                    bottom: focused ? 10 : 0,
                    overflow: 'hidden',
                    borderTopWidth: focused ? 5 : null, borderColor: 'red'
                  }}>
                  <Image
                    style={{
                      height: focused ? 50 : 30,
                      width: focused ? 50 : 30,
                      tintColor: focused ? 'red' : white, resizeMode: "contain",
                    }}
                    source={require('../../assets/tvf.png')}
                    resizeMode="contain"
                  />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Cartoons"
            component={Cartoons}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0,0,0,0)',
                    width: focused ? 80 : 50,
                    height: focused ? 70 : 50,
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45,
                    bottom: focused ? 10 : 0,
                    overflow: 'hidden',
                    borderTopWidth: focused ? 5 : null, borderColor: 'red'
                  }}>
                  <Image
                    style={{
                      height: focused ? 50 : 30,
                      width: focused ? 50 : 30, resizeMode: "contain",
                      tintColor: focused ? 'red' : white,
                    }}
                    source={require('../../assets/animatedf.png')}
                    resizeMode="contain"
                  />

                </View>
              ),
            }}
          />
          <Tab.Screen
            name="PlayList"
            component={PlayList}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0,0,0,0)',
                    width: focused ? 80 : 50,
                    height: focused ? 70 : 50,
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45,
                    bottom: focused ? 10 : 0,
                    overflow: 'hidden',
                    borderTopWidth: focused ? 5 : null, borderColor: 'red'
                  }}>
                  <Image
                    style={{
                      height: focused ? 50 : 30,
                      width: focused ? 50 : 30,
                      tintColor: focused ? 'red' : white, resizeMode: "contain"
                    }}
                    source={require('../../assets/playlistf.png')}
                    resizeMode="contain"
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
