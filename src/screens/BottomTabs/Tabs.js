import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import Signin from '../Signin';
import TvShowes from '../TvShowes';
import Cartoons from '../Cartoons';
import Find from '../Find';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator screenOptions={{headerShown:false,tabBarShowLabel:false}}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: focused ? '#1d5d58' : 'lightgray',
                  }}
                  source={require('../../assets/home.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#1d5d58' : 'lightgray',
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
                    height: 30,
                    width: 30,
                    tintColor: focused ? '#1d5d58' : 'lightgray',
                  }}
                  source={require('../../assets/tvshow.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#1d5d58' : 'lightgray',
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
                    height: 30,
                    width: 30,
                    tintColor: focused ? '#1d5d58' : 'lightgray',
                  }}
                  source={require('../../assets/cartoon.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#1d5d58' : 'lightgray',
                    fontSize: 10,
                  }}>
                  Cartoons
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Find"
          component={Find}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: focused ? '#1d5d58' : 'lightgray',
                  }}
                  source={require('../../assets/search.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? '#1d5d58' : 'lightgray',
                    fontSize: 10,
                  }}>
                  Find
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
