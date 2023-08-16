import { FlatList, Image, ImageBackground, StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { secondary } from '../utillis/colors';
import MainCard from '../components/MainCard';

const ExpandMovies = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  const { data, type } = route.params;
  const dataArray = Array.isArray(data) ? data : [];
  const sortedData = [...dataArray].sort((a, b) => b.releaseYear.localeCompare(a.releaseYear));

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: secondary }}>
      <View
        style={{
          flex: 1,
          marginBottom: 70
        }}>
        <View style={styles.input_Container}>
          <TextInput
            style={{
              height: '100%',
              width: '80%',
              color: '#fff',
              borderColor: '#fff',
            }}
            autoCapitalize={'none'}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            placeholder={'search'}
            placeholderTextColor={'gray'}
          />
          <Image
            style={[styles.icons, { tintColor: 'gray' }]}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9479/9479251.png',
            }}
          />
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <FlatList
            numColumns={3}
            data={sortedData.filter(item =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            renderItem={({ item }) =>
              MainCard({ item: item, data: type == 'show' ? item : data, navigation: navigation, type: type })
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExpandMovies;
const styles = StyleSheet.create({
  main_View: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  cards: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
  },
  h2: { color: '#fff', fontSize: 14 },
  h1: { color: '#fff', fontSize: 18 },
  icons: { height: 20, width: 20 },
  input_Container: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 5,
    width: '95%',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  assets_Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '25%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
  modalView: {
    height: 80,
    width: '60%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 5,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  details_View: {
    height: '60%',
    alignSelf: 'flex-end',
    width: '35%',
    paddingLeft: 20,
  },
});
