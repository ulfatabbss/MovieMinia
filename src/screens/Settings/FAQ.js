import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow } from '../../assets';
const Up = require('../../assets/appIcons/up.png');
const Down = require('../../assets/appIcons/down.png');
import heading from '../../utillis/fonts'
const FAQItem = ({ theme, title, content, isOpen, toggle }) => (
    <View
        style={[
            styles.faqItem,
            { backgroundColor: theme.colors.tabs },
            isOpen && styles.faqItemOpen,
        ]}>
        <TouchableOpacity onPress={toggle}>
            <View style={styles.faqHeader}>
                <Text numberOfLines={1} style={[styles.faqTitle, { color: theme.colors.text }]}>
                    {title}
                </Text>
                <Image
                    style={{ ...styles.faqIcon, tintColor: theme.colors.icon }}
                    resizeMode="contain"
                    source={isOpen ? Up : Down}
                />
            </View>
        </TouchableOpacity>
        {isOpen && (
            <>
                <View style={styles.separator} />
                <Text style={[styles.faqContent, { color: theme.colors.text }]}>{content}</Text>
            </>
        )}
    </View>
);

const Faq = ({ navigation }) => {
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);

    const [faqItems, setFaqItems] = useState([
        {
            title: 'FAQ Item 1',
            content: 'Content for FAQ Item 1 goes here...',
            isOpen: false,
        },
        {
            title: 'FAQ Item 2',
            content: 'Content for FAQ Item 2 goes here...',
            isOpen: false,
        },
        {
            title: 'FAQ Item 3',
            content: 'Content for FAQ Item 3 goes here...',
            isOpen: false,
        },
        {
            title: 'FAQ Item 4',
            content: 'Content for FAQ Item 4 goes here...',
            isOpen: false,
        },
    ]);

    const toggleFAQItem = (index) => {
        const updatedItems = [...faqItems];
        updatedItems[index].isOpen = !updatedItems[index].isOpen;
        setFaqItems(updatedItems);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.topbar }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backIcon, { tintColor: theme.colors.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.colors.text }]}>FAQ'S</Text>
            </View>
            <View style={[styles.faqContainer, { backgroundColor: theme.colors.background }]}>
                {faqItems.map((item, index) => (
                    <FAQItem
                        key={index}
                        theme={theme}
                        title={item.title}
                        content={item.content}
                        isOpen={item.isOpen}
                        toggle={() => toggleFAQItem(index)}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        gap: 5,
        // justifyContent: 'space-between',
    },
    backIcon: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
    title: {
        ...heading.h4,
        marginLeft: '5%',
    },
    faqContainer: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: '5%',
    },
    faqItem: {
        height: 45,
        marginBottom: '5%',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    faqItemOpen: {
        height: 164,
    },
    faqHeader: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
    },
    faqTitle: {
        ...heading.h6,
        marginLeft: '5%',
        width: '70%',
    },
    faqIcon: {
        height: 18,
        width: 18,
        marginRight: '5%',
        // tintColor: theme.colors.icon,
    },
    separator: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'gray',
        height: 1,
    },
    faqContent: {
        ...heading.h7,
        alignSelf: 'center',
        width: '90%',
        marginTop: '5%',
    },
});

export default Faq;
