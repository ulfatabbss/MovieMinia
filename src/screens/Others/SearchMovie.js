import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, StatusBar, ActivityIndicator, Dimensions
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
    const [emptyImage, setImage] = useState(false);
    const [isRecent, setIsRecent] = useState(true);
    const [loading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const [activityLoader, setActivityLoader] = useState(false);
    const onEndReached = async () => {
        setActivityLoader(true);
        if (loadMore && movie.length >= 10) {
            try {
                const nextPage = page + 1;
                const result = await SearchMovies_Db(search, nextPage);
                const newMovies = result.data.movies;

                // Filter out duplicates based on title and category
                const uniqueNewMovies = newMovies.filter((newMovie) => (
                    !movie.some((existingMovie) =>
                        existingMovie.title === newMovie.title &&
                        existingMovie.category === newMovie.category
                    )
                ));

                setMovie([...movie, ...uniqueNewMovies]);
                setPage(nextPage);
            } catch (error) {
                // Handle API request error here
                console.error('API request error:', error);
            }
        }

        setActivityLoader(false);
    };

    const searchFilter = async (item) => {
        setIsLoading(true);
        setPage(1);
        const result = await SearchMovies_Db(item ? item : search, 1);
        const newMovies = result.data.movies;
        setSearch(search);
        setIsLoading(false);
        if (newMovies.length > 0) {
            setMovie(newMovies);
            setLoadMore(true);
            setImage(false)
        } else {
            setMovie([]);
            setLoadMore(false);
            setImage(true)
        }
    };
    const ClickMovie = (item) => {
        if (item && item.title) {
            const movieTitle = item.title;

            if (!recentSearches.includes(movieTitle)) {
                // Movie title doesn't exist in recent searches, add it
                const updatedRecentSearches = [...recentSearches, movieTitle];
                dispatch(setRecentSearches(updatedRecentSearches));
            }

            setIsRecent(true);
            setSearch('');
            navigation.navigate('MovieDiscription', {
                item: item,
                data: item,
                type: "search"
            });
        }
    };

    const handleSearch = () => {
        setPage(1)
        searchFilter();
    };
    const handleClearRecentSearches = () => {
        store.dispatch(setRecentSearches([]));
        setIsRecent(true);
    };
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
    const recentSearchButtons = async (item) => {
        setPage(1)
        await searchFilter(item);
    }
    const recentListView = ({ item }) => (
        <TouchableOpacity
            onPress={() => recentSearchButtons(item)}
            style={{
                width: Dimensions.get('window').width / 3 - RF(15), // Set the width to one-third of the screen width
                margin: RF(3),
                backgroundColor: Gray200,
                padding: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text numberOfLines={1} style={{ width: '100%', color: Black, fontSize: RF(13), fontFamily: 'Raleway-Medium' }}>{item}</Text>
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
                        placeholder="Search here..."
                        placeholderTextColor={theme?.colors?.text}
                        color="gray"
                        style={{ width: '75%' }}
                    //  onEndEditing={handleSearch} 
                    />
                    <TouchableOpacity disabled={search == ''} onPress={handleSearch}>
                        <Image style={{ ...SmallIcons, tintColor: '#EAAE23' }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/660/660333.png" }} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ flex: 1, padding: 10 }}>
                {isRecent && recentSearches.length != 0 &&
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: theme?.colors?.text }}>{recentSearches.length == 0 ? 'No recent searches' : 'Recent Searches'}</Text>
                            <Text onPress={() => handleClearRecentSearches()} style={{ color: '#EAAE23' }}>{recentSearches.length == 0 ? null : 'Clear All'}</Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={recentSearches}
                            showsHorizontalScrollIndicator={false}
                            renderItem={recentListView}
                        />
                    </View>
                }

                {!movie.length == 0 && <Text
                    style={{
                        color: '#EAAE23',
                        fontFamily: 'Raleway-Medium',
                        fontSize: RF(14),
                    }}>
                    {movie.length} Result Found
                </Text>}
                {emptyImage &&
                    <View
                        style={{
                            marginTop: RF(30),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: RF(300), width: RF(300) }}
                            source={require('../../assets/appIcons/error404.png')}>
                        </Image>
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
                    </View>}
                {movie.length != 0 &&
                    <View style={{
                        width: '100%',
                        paddingBottom: !isRecent ? '25%' : '5%'
                    }}>
                        <FlatList
                            numColumns={2}
                            data={movie}
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0.1}
                            renderItem={({ item }) => (
                                <SearchView item={item} onPress={ClickMovie} />
                            )}
                            ListFooterComponent={() => activityLoader && <ActivityIndicator size="small" color={theme?.colors?.primary} />}
                        />
                    </View>
                }

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