import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, StatusBar
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MyWrapper from '../../components/myWrapper';
import {
    Black,
    Gray200,
    Secondary,
    White,
} from '../../utillis/theme';
import { SmallIcons, TopBar } from '../../utillis/styles';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { LogBox } from 'react-native';
import { setRecentSearches } from '../../redux/reducers/userReducers';
import { store } from '../../redux/store';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow, searchIcon } from '../../assets';
import { HP, RF, WP } from '../../utillis/theme/Responsive';
import { SearchMovies_Db } from '../../services/AppServices';
import Loader from '../../components/Loader';
LogBox.ignoreLogs(['Warning: ...']);
const SearchMovie = ({ navigation }) => {
    const {
        recentSearches, myTheme,
    } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
    const [search, setSearch] = useState('');
    // const [masterData, setMasterData] = useState([]);
    const [movie, setMovie] = useState([]);
    const [isRecent, setIsRecent] = useState(true);
    const [loading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const searchFilter = async (text) => {
        setIsLoading(true)
        if (text) {
            const result = await SearchMovies_Db(text)
            const masterData = result.data.movies
            const newData = masterData.filter(item => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                if (textData.length >= 1) {
                    setIsRecent(false)
                }
                else {
                    setIsRecent(true)
                }
                return itemData.indexOf(textData) > -1;
            });
            setMovie(newData);
            setSearch(text);
            setIsLoading(false)
        } else {
            setMovie([]);
            setSearch(text);
            setIsLoading(false)
            setIsRecent(true);
        }

    };
    const ClickMovie = (item) => {
        if (item && item.title) {
            if (!recentSearches.includes(item?.title)) {
                const updatedRecentSearches = [...recentSearches, item?.title];
                dispatch(setRecentSearches(updatedRecentSearches));
            }
            setIsRecent(true);
            setSearch("");
            navigation.navigate('MovieDiscription', {
                item: item,
                data: item,
                type: "search"
            });
        }
    };
    const handleSearch = () => {
        searchFilter(search); // Call the searchFilter function with the current search text
    };
    const handleClearRecentSearches = () => {
        store.dispatch(setRecentSearches([]));
        setIsRecent(true);
    };
    if (loading) {
        return <Loader />
    }
    const SearchView = React.memo(({ item, onPress }) => (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={styles.SeacrhView1}>
            <ImageBackground
                style={{
                    height: '100%',
                    width: '100%',
                }}
                source={{ uri: item?.poster[1]?.image }}>
                <LinearGradient
                    style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                >
                    <Text
                        style={styles.text}>
                        {item.title}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    ));
    const recentSearchButtons = (item) => {
        searchFilter(item);


    }
    const recentListView = ({ item }) => (
        <TouchableOpacity onPress={() => recentSearchButtons(item)} style={{ width: RF(100), margin: 5, backgroundColor: Gray200, padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ width: '100%', color: Black, fontSize: 13, fontFamily: 'Raleway-Medium' }}>{item}</Text>
        </TouchableOpacity>
    );
    if (loading) {
        return <Loader />
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme?.colors?.background }}>
            <StatusBar backgroundColor={theme?.colors?.topbar} barStyle={myTheme == 'lightTheme' ? 'dark-content' : 'light-content'} />

            <View style={{ ...TopBar, backgroundColor: theme?.colors?.topbar }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image
                        resizeMode="contain"
                        style={{ ...SmallIcons, tintColor: theme?.colors?.icon }}
                        source={backErrow} />
                </TouchableOpacity>

                <View style={{ ...styles.InputView, backgroundColor: theme?.colors?.background }}>
                    <Image
                        style={{ ...SmallIcons, tintColor: theme?.colors?.icon }}
                        source={searchIcon}></Image>
                    <TextInput
                        value={search}
                        onChangeText={text => setSearch(text)}
                        placeholder="Search Movies"
                        placeholderTextColor={theme?.colors?.text}
                        color="gray"
                        style={{ width: '95%' }} onEndEditing={handleSearch} />
                </View>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                {isRecent &&
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: theme?.colors?.text }}>{recentSearches.length == 0 ? 'No recent searches' : 'Recent Searches'}</Text>
                            <Text onPress={() => handleClearRecentSearches()} style={{ color: '#EAAE23' }}>{recentSearches.length == 0 ? null : 'Clear All'}</Text>

                        </View>
                        <FlatList numColumns={2}
                            data={recentSearches}
                            renderItem={recentListView}></FlatList>
                    </View>
                }

                {!movie.length == 0 && <Text
                    style={{
                        color: '#EAAE23',
                        fontFamily: 'Raleway-Medium',
                        fontSize: 14,
                    }}>
                    {movie.length} Result Found
                </Text>}
                {movie.length == 0 ? (
                    <View
                        style={{
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: RF(300), width: RF(300) }}
                            source={require('../../assets/appIcons/error404.png')}></Image>
                        <Text
                            style={{
                                color: Secondary,
                                fontFamily: 'Raleway-Bold',
                                fontSize: RF(22),
                            }}>
                            Not Found
                        </Text>
                        <Text
                            style={{
                                color: theme?.colors?.text,
                                fontFamily: 'Raleway-Regular',
                                fontSize: 16,
                                textAlign: 'center',
                            }}>
                            Sorry, the keyword you entered cannot be found, please check
                            again or search with another keyword.
                        </Text>
                    </View>
                ) : (
                    <View style={{ alignSelf: 'center', marginTop: 10, paddingBottom: 10 }}>
                        <FlatList
                            numColumns={2}
                            data={movie}
                            renderItem={({ item }) => (
                                <SearchView item={item} onPress={ClickMovie} />
                            )}
                        />
                    </View>
                )}

            </View>
        </View>
    );
};

export default SearchMovie;

const styles = StyleSheet.create({
    InputView: {
        height: 40,
        width: '90%',
        backgroundColor: White,
        borderRadius: 60,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10, gap: 10
    }, SeacrhView1: {
        width: WP(45),
        height: HP(25),
        borderRadius: 10,
        margin: 5,
        overflow: 'hidden',
        flexShrink: 0,
    },
    text: {
        color: '#FFFFFF',
        fontSize: RF(12),
        fontFamily: 'Raleway-Bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingHorizontal: 5,
    }
});