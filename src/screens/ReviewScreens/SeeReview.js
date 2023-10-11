import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import { Primary } from '../../utillis/colors'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { backErrow, clock } from '../../assets'
import { Heading, smalltext, text } from '../../utillis/styles'
import { GetFeedback } from '../../services/AppServices'
import { RF } from '../../utillis/theme/Responsive'
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};
const Review = ({ navigation, route }) => {
    const { data } = route.params;
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const [feedback, setfeedback] = useState('')
    const sortByTimestampAscending = () => {
        // Use the JavaScript sort method to sort the array in ascending order
        data.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();

            // Compare the timestamps to determine the order
            return timestampB - timestampA;
        });

        // Return the sorted feedback data
        return data

    };
    useEffect(() => {
        const result = sortByTimestampAscending()
        // console.log(result);
        setfeedback(result)

    }, [])
    const FLV = ({ item }) => (

        <View
            style={{ width: '100%', marginTop: '5%' }}>
            <View
                style={{ flexDirection: 'row', height: RF(50), }}>
                <Image
                    style={{ height: RF(40), width: RF(40), borderRadius: RF(90), }}
                    resizeMode='contain'
                    source={{ uri: item?.user_id?.profilePicture ? item?.user_id?.profilePicture : 'https://cdn-icons-png.flaticon.com/128/149/149071.png' }}>
                </Image>
                <View
                    style={{ marginLeft: '2%' }}>
                    <Text
                        style={{ ...Heading, color: theme?.colors?.text, fontSize: RF(16) }}>{item?.user_id?.name}</Text>
                    <View
                        style={{ flexDirection: 'row', marginTop: RF(5), justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: RF(20), width: RF(20), }}
                            resizeMode='contain'
                            source={clock}>
                        </Image>
                        <Text
                            style={{ ...text, marginLeft: '2%', color: theme?.colors?.text }}>{formatDate(item?.timestamp)}

                        </Text>
                    </View>

                </View>

            </View>
            <Text
                style={{ ...text, color: theme?.colors?.text, marginTop: RF(5), textAlign: 'justify' }}>
                {item?.feedback_text}
            </Text>

        </View>
    )
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme?.colors?.topbar }]}>
            <StatusBar backgroundColor={theme?.colors?.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backButton, { tintColor: theme?.colors?.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={{ ...Heading, color: theme?.colors?.text }}>Reviews Listing</Text>
            </View>
            <View
                style={[styles.V5, { backgroundColor: theme?.colors?.background, paddingBottom: RF(110) }]}>
                <View
                    style={styles.V3}>
                    {data.length == 0 ? null : <Text
                        style={{ ...Heading, fontWeight: '600', color: theme?.colors?.text }}>{data?.length} total feedbacks</Text>}
                    <FlatList
                        renderItem={FLV}
                        data={feedback}>

                    </FlatList>

                </View>



            </View>
        </SafeAreaView>
    )
}

export default Review

const styles = StyleSheet.create({
    V1: {
        flex: 1,
        backgroundColor: Primary

    },
    V2: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    img1: {
        height: 25,
        width: 20,
        alignSelf: 'center'
    },
    V5: { height: '100%', backgroundColor: 'red' },
    V3: {
        width: '90%',
        marginTop: '5%', alignSelf: "center"
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 10
    },
    backButton: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },

})