import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { useTheme } from 'react-native-paper';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const DATA = Array(8).fill({ id: 'placeholder' }); // Generate placeholder data
const shimmerColors = ['#ebebeb', 'rgba(0, 0, 0, 0.1)', '#ebebeb'];

const PlaylistSkelton = () => {
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);

    const renderItem = () => (
        <View style={styles.mainCard}>
            <ShimmerPlaceholder
                duration={2000}
                shimmerColors={shimmerColors}
                style={styles.movieImg}
            />
            <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                {Array(4)
                    .fill()
                    .map((_, index) => (
                        <ShimmerPlaceholder
                            key={index}
                            duration={2000}
                            shimmerColors={shimmerColors}
                            style={styles.textShimmer}
                        >
                            <Text style={styles.movieTitle}>''</Text>
                        </ShimmerPlaceholder>
                    ))}
            </View>
            <View
                style={{
                    marginLeft: 10,
                    alignSelf: 'center',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                    alignItems: 'center', gap: 10
                }}
            >
                {Array(2)
                    .fill()
                    .map((_, index) => (
                        <TouchableOpacity key={index}>
                            <ShimmerPlaceholder
                                duration={2000}
                                shimmerColors={shimmerColors}
                                style={[styles.playIcon, { alignSelf: 'center' }]}
                            />
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={theme.colors.topbar}
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
            />
            <View style={{ ...styles.headerContainer, backgroundColor: theme.colors.topbar }}>
                <Text style={{ ...styles.headerText, color: theme.colors.text }}>My Playlist</Text>
            </View>
            <View style={styles.contentContainer}>
                <ShimmerPlaceholder
                    duration={2000}
                    shimmerColors={shimmerColors}
                    style={styles.InputView}
                />
                <View style={styles.playlistContainer}>
                    {/* Removed commented code */}
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${item.id}_${index}`}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5e9cd',
    },
    textShimmer: { width: '70%', marginVertical: 3, height: 12, borderRadius: 5 },
    movieImg: {
        width: 90,
        height: 84,
        alignSelf: 'center',
        borderRadius: 20,
    },
    playIcon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        borderRadius: 15,
    },
    mainCard: {
        backgroundColor: '#fff',
        padding: 8,
        marginVertical: 8,
        borderRadius: 20,
        width: '100%',
        height: 110,
        flexDirection: 'row',
    },
    movieTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#313131',
    },
    headerContainer: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        marginLeft: '5%',
    },
    contentContainer: {
        backgroundColor: '#F8F8F8',
        flex: 2,
        alignItems: 'center',
    },
    InputView: {
        height: 45,
        width: '92%',
        alignSelf: 'center',
        backgroundColor: '#E1E4E8',
        borderRadius: 60,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        margin: 10,
        paddingHorizontal: 10,
    },
    playlistContainer: {
        width: '95%',
        height: '100%',
        alignSelf: 'center',
        padding: 10,
    },
});

export default PlaylistSkelton;
