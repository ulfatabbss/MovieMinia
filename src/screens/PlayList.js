import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Primary, black, white} from '../utillis/colors';
import {Movies} from './Dashboard';
import AnimatedLottieView from 'lottie-react-native';

const PlayList = ({navigation}) => {
  const PlayList = ({item}) => (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        width: '100%',
      }}>
      <Text style={{color: 'gray', margin: 8}}>{item.id}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Player', {url: item.uri})}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{height: 50, width: 50, marginRight: 10, borderRadius: 90}}
          source={{uri: item.Image}}></Image>
        <View>
          <Text style={{color: white}}>{item.name}</Text>
          <Text numberOfLines={1} style={{color: 'gray'}}>
            Artist | song | Arjit singh from india
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../assets/remove.png')}
          style={{
            width: 20,
            height: 20,
            tintColor: 'gray',
            marginTop: 5,
            marginStart: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: black,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20, color: '#fff', marginVertical: 20}}>
        Play List
      </Text>
      <FlatList
        data={Movies}
        showsVerticalScrollIndicator={false}
        renderItem={PlayList}
      />
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({});
