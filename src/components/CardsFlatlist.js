import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import MainCard from './MainCard';
import { smalltext, Heading } from '../utillis/styles';
import { useTheme } from 'react-native-paper'; // Import useTheme
import darkTheme from '../utillis/theme/darkTheme';
import { useSelector } from 'react-redux';
import lightTheme from '../utillis/theme/lightTheme';

const CardsFlatlist = ({ navigation, heading, data, type }) => {
    const {
        myTheme
    } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
    const dataArray = Array.isArray(data) ? data : [];

    // Sort the array by releaseYear in descending order
    const sortedData = [...dataArray].sort((a, b) => b.releaseYear.localeCompare(a.releaseYear)).slice(0, 10);

    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <View
                style={{
                    ...styles.headingContainer,
                }}
            >
                <Text style={{ ...Heading, color: theme.colors.text }}>{heading}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ExpandMovies', {
                            data: data,
                            type: type,
                        });
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        justifyContent: 'flex-end',
                        marginTop: 5,
                        marginRight: 10,
                    }}>
                    <Text style={{ ...smalltext, color: theme.colors.text }}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={sortedData}
                renderItem={({ item }) =>
                    MainCard({ item: item, data: type == 'show' ? item : data, navigation: navigation, type: type })
                }
            />
        </View>
    );
};

export default CardsFlatlist;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    headingContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});
