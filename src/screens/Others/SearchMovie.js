import {
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
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
import { setGetAllMoviesData, setLoading, setRecentSearches } from '../../redux/reducers/userReducers';
import { store } from '../../redux/store';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import ExpandCard from '../../components/ExpnadCard';
import { backErrow, searchIcon } from '../../assets';
import { RF } from '../../utillis/theme/Responsive';
import { GetAllMovies } from '../../services/AppServices';
import Loader from '../../components/Loader';
LogBox.ignoreLogs(['Warning: ...']);
const SearchMovie = ({ navigation }) => {
    const {
        getAllMoviesData, recentSearches, myTheme, loading
    } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
    const [search, setSearch] = useState('');
    const [masterData, setMasterData] = useState([]);
    const [movie, setMovie] = useState(getAllMoviesData);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [isRecent, setIsRecent] = useState(true);
    const dispatch = useDispatch()
    const searchFilter = text => {
        if (text) {
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
        } else {
            setMovie(masterData);
            setSearch(text);
        }
    };

    const recentSearchButtons = (item) => {
        searchFilter(item);
    }
    const ClickMovie = async (item) => {
        if (item && item.title) {
            if (!recentSearches.includes(item?.title)) {
                const updatedRecentSearches = [...recentSearches, item?.title];
                store.dispatch(setRecentSearches(updatedRecentSearches));
            }
            setIsRecent(true);
            setSearch("");
            navigation.navigate('MovieDiscription', {
                item: item,
                data: item,
                type: "search"
            });
        } else {
            console.error('Invalid item:', item);
        }
    };

    useEffect(() => {
        console.log(recentSearches);
        const integrate = async () => {
            dispatch(setLoading(true));
            try {
                const getMovies = await GetAllMovies()
                dispatch(setGetAllMoviesData(getMovies?.data));
                setMasterData(getAllMoviesData);
            } catch (error) {
                if (error.message === 'Network Error') {
                    Alert.alert('⚠️ Check your internet connection and try again .....!');
                } else {
                    Alert.alert('⚠️ An error occurred. Please try again later.');
                }
            } finally {
                dispatch(setLoading(false));
            }
        }
        integrate();
    }, []);

    const SearchView = ({ item }) => (
        <TouchableOpacity
            onPress={() => ClickMovie(item)}
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
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 1.0 }}
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}>
                    <Text
                        style={{
                            color: theme?.colors?.text,
                            fontFamily: 'Raleway-Bold',
                            marginBottom: 8,
                            fontSize: 17,
                        }}>
                        {item.title}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
    const recentListView = ({ item }) => (
        <TouchableOpacity onPress={() => recentSearchButtons(item)} style={{ margin: 10, backgroundColor: Gray200, padding: 10, borderRadius: 60 }}>
            <Text style={{ color: Black, fontSize: 13, fontFamily: 'Raleway-Medium' }}>{item}</Text>
        </TouchableOpacity>
    );
    if (loading) {
        return <Loader />
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme?.colors?.background }}>
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
                        onChangeText={text => searchFilter(text)}
                        placeholder="Search Movies"
                        placeholderTextColor={theme?.colors?.text}
                        color="gray"
                        style={{ width: '90%' }} />
                </View>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                {isRecent ? (
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: theme?.colors?.text }}>Recent Searches</Text>
                        <FlatList numColumns={3}
                            data={recentSearches}
                            renderItem={recentListView}></FlatList>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: theme?.colors?.text,
                                fontFamily: 'Raleway-Medium',
                                fontSize: 14,
                            }}>
                            {movie.length} Result Found
                        </Text>
                        {isDataAvailable ? (
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ height: 300, width: 300 }}
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
                            <View style={{ alignSelf: 'center', marginTop: 10 }}>
                                <FlatList
                                    numColumns={2}
                                    renderItem={(item) => SearchView(item)}
                                    // renderItem={({ item }) => <ExpandCard item={item} data={movie} navigation={navigation} type={"Movies"} />}
                                    data={movie} />
                            </View>
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
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
        paddingHorizontal: 10,
    }, SeacrhView1: {
        height: 190,
        width: 160,
        margin: 5,
        alignSelf: 'center',
        borderRadius: 19,
        overflow: 'hidden',
    }
});