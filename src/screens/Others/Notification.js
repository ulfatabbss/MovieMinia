import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, FlatList, StatusBar } from 'react-native'
import React from 'react'
import Color, { Primary } from '../../utillis/colors'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { useTheme } from 'react-native-paper'
import { backErrow } from '../../assets'
const data = [

    {


        img: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU' },
        time: 'Just now',

        Notify: 'Danial Austin has assigned you a new project (Kickoff meeting project).'
    },
    {


        img: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU' },

        time: 'Just now',

        Notify: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...'
    },
    {


        img: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU' },

        time: 'Just now',

        Notify: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...'
    },
    {


        img: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU' },

        time: 'Just now',

        Notify: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...'
    },
    {


        img: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU' },

        time: 'Just now',

        Notify: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...'
    },
    {

        img: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU' },

        time: 'Just now',

        Notify: 'Danial Austin has assigned you a new project (Kickoff meeting project).'
    },

]

const Notification = ({ navigation }) => {
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);
    const NotificationItem = ({ item, theme }) => (
        <View style={styles.notificationItem}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    resizeMode='contain'
                    source={item.img}
                />
            </View>
            <Text style={{ ...styles.notificationText, color: theme?.colors?.text }}>{item.Notify}</Text>
            <Text style={{ ...styles.notificationTime, color: theme?.colors?.text }}>{item.time}</Text>
        </View>
    );
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.topbar }]}>
            <StatusBar backgroundColor={theme?.colors?.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />

            <View style={[styles.header, { backgroundColor: theme?.colors?.topbar }]}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.backButton, { tintColor: theme?.colors?.icon }]}
                            resizeMode='contain'
                            source={backErrow}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerText, { color: theme?.colors?.text }]}>Notification</Text>
                </View>
            </View>
            <View style={[styles.content, { backgroundColor: theme?.colors?.background }]}>
                <View style={styles.notificationList}>
                    {data.length === 0 ? null : (
                        <Text style={[styles.notificationCount, { color: theme?.colors?.text }]}>
                            {data.length} Notification
                        </Text>
                    )}
                    <FlatList
                        renderItem={({ item }) => <NotificationItem item={item} theme={theme} />}
                        data={data}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
    headerText: {
        marginLeft: '5%',
        ...heading.h4,
    },
    content: {
        height: '100%',
        backgroundColor: Primary,
    },
    notificationList: {
        width: '90%',
        marginTop: '5%',
        alignSelf: 'center',
    },
    notificationCount: {
        ...heading.h5,
        fontWeight: '600',
        marginBottom: 10,
    },
    notificationItem: {
        height: 62,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        marginBottom: 10,
        borderColor: 'gray',
    },
    avatarContainer: {
        height: '100%',
        width: 45,
    },
    avatar: {
        height: 45,
        width: 45,
        borderRadius: 90,
    },
    notificationText: {
        width: 201,
        height: '100%',
        fontSize: 12,
        fontWeight: '400',
    },
    notificationTime: {
        height: '100%',
        width: '20%',
        fontSize: 12,
        fontWeight: '400',
        alignSelf: 'center',
    },
});

export default Notification;