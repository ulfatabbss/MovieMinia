import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Primary, black, white} from '../utillis/colors';
import {Movies} from './Dashboard';
import AnimatedLottieView from 'lottie-react-native';
import Header2 from '../components/Header2';


const PlayList = ({navigation}) => {
  const [movie, setMovie] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const searchFilter =(text)=>{
    if (text) {
      const newData= masterData.filter((item)=>{
        const itemData = item.name? item.name.toUpperCase(): '' .toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setMovie(newData);
      setSearch(text);
    }
    else
    {
      setMovie(masterData);
      setSearch(text);
    }
      }
  useEffect(()=> {
    setMovie(Movies)
    setMasterData(Movies)
  },[])
  
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
        <Header2 navigation={navigation} text={'Play List'} color={white}/>
      {/* <Text style={{fontSize: 20, color: '#fff', marginVertical: 20}}>
        Play List
      </Text> */}
      <View style={styles.searchInput}>
        <TextInput
          style={styles.inputTxt}
          value={search}
          onChangeText={(text)=> searchFilter(text)}
          placeholder="Search"
          clearButtonMode='true'
        />
        <TouchableOpacity>
        <Image
          source={require('../assets/cancel.png')}
          style={styles.searchIcon}
        />
        </TouchableOpacity>
      </View>

      <FlatList
        data={movie}
        showsVerticalScrollIndicator={false}
        renderItem={PlayList}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  searchInput: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTxt: {
    width: '85%',
    height: 40,
    paddingStart: 20,
  },
  searchIcon: {
    width: 15,
    height: 15,
    tintColor: 'gray',
    marginTop: 5,
    marginStart: 15,
    
  },
});
