import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View, TouchableOpacity
} from 'react-native';
import ExpandCard from '../../components/ExpnadCard';
import { Heading, SmallIcons, TopBar } from '../../utillis/styles';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, searchIcon } from '../../assets';

const ExpandMovies = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    myTheme,
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const { data, type } = route.params;
  const dataArray = Array.isArray(data) ? data : [];
  const sortedData = [...dataArray].sort((a, b) => b.releaseYear.localeCompare(a.releaseYear));
  const [search, setSearch] = useState('');
  const [movie, setMovie] = useState(sortedData);
  const searchFilter = text => {
    if (text) {
      const newData = sortedData.filter(item => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setMovie(newData);
      setSearch(text);
    } else {
      setMovie(sortedData);
      setSearch(text);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center', gap: 20,
        paddingHorizontal: 20, backgroundColor: theme.colors.topbar
      }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image
            resizeMode="contain"
            style={{ ...SmallIcons, tintColor: theme.colors.icon }}
            source={backErrow} />
        </TouchableOpacity>

        <Text style={{ ...Heading, color: theme.colors.text }}>Movies</Text>
      </View>
      <View style={{ ...styles.InputView, backgroundColor: theme.colors.tabs, elevation: 2, shadowOffset: 3 }}>
        <Image
          style={{ ...SmallIcons, tintColor: theme.colors.icon }}
          source={searchIcon}></Image>
        <TextInput
          value={search}
          onChangeText={text => searchFilter(text)}
          placeholder="Search Movies"
          placeholderTextColor={theme.colors.text}
          color="gray"
          style={{ width: '90%' }} />
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={movie.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={({ item }) => (
            <ExpandCard item={item} data={type === 'show' ? item : data} navigation={navigation} type={type} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExpandMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingBottom: 60
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    borderWidth: 1,
    gap: 10,
    borderColor: 'gray',
    borderRadius: 60,
    alignSelf: 'center', color: 'balck',
    justifyContent: 'space-around', backgroundColor: 'white'
  },
  searchInput: {
    height: '100%',
    color: '#000',
  },
  searchIcon: {
    height: 20,
    width: 20,
    tintColor: 'gray',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center', paddingBottom: '35%'
  },
  InputView: {
    height: 40,
    width: '92%', alignSelf: 'center',
    backgroundColor: '#E1E4E8',
    borderRadius: 60,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10, paddingHorizontal: 10

  },
});
