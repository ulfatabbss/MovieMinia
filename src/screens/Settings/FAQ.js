import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,
    ScrollView,
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
            { backgroundColor: theme?.colors?.tabs },
            isOpen && styles.faqItemOpen,
        ]}>
        <TouchableOpacity onPress={toggle}>
            <View style={styles.faqHeader}>
                <Text numberOfLines={1} style={[styles.faqTitle, { color: theme?.colors?.text }]}>
                    {title}
                </Text>
                <Image
                    style={{ ...styles.faqIcon, tintColor: theme?.colors?.icon }}
                    resizeMode="contain"
                    source={isOpen ? Up : Down}
                />
            </View>
        </TouchableOpacity>
        {isOpen && (
            <>
                <View style={styles.separator} />
                <Text style={[styles.faqContent, { color: theme?.colors?.text }]}>{content}</Text>
            </>
        )}
    </View>
);

const Faq = ({ navigation }) => {
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);

    const [faqItems, setFaqItems] = useState([
        {
            title: '1. What is Movie Minia?',
            content: 'Movie Minia is a mobile application that provides a platform for movie enthusiasts to discover, watch, and explore a vast collection of movies, TV shows, and related content. It offers personalized recommendations, user reviews, and a seamless viewing experience.',
            isOpen: false,
        },
        {
            title: '2. How do I download Movie Minia?',
            content: 'You can download Movie Minia from the App Store for iOS devices and the Google Play Store for Android devices. Simply search for "Movie Minia" and follow the installation instructions.',
            isOpen: false,
        },
        {
            title: '3. Is Movie Minia free to use?',
            content: 'Movie Minia offers both free and premium subscription options. You can access a limited selection of content for free, but to unlock all features and access a broader library, you can subscribe to our premium plan, which comes with a monthly fee.',
            isOpen: false,
        },
        {
            title: '4. How do I create an account?',
            content: "To create an account on Movie Minia, open the app, and click on the 'Sign Up' button. You'll need to provide a valid email address, create a password, and follow the on-screen prompts to complete your registration.",
            isOpen: false,
        },
        {
            title: '5. Is my personal information safe with Movie Minia?',
            content: 'Yes, we take your privacy seriously. We have implemented strict security measures to protect your personal information. For more details, please refer to our Privacy Policy.',
            isOpen: false,
        },
        {
            title: '6. Can I suggest movies or TV shows to be added to Movie Minia?',
            content: 'Absolutely! We welcome your suggestions. You can use the  "Add feedback" feature within the app to recommend content that you can like to see on Movie Minia.',
            isOpen: false,
        },
        {
            title: '7. Does Movie Minia support multiple devices?',
            content: 'Yes, Movie Minia is designed to work on multiple devices. You can access your account and content on various devices such as smartphones, tablets, and smart TVs by logging in with the same account credentials',
            isOpen: false,
        },
    ]);

    const toggleFAQItem = (index) => {
        const updatedItems = [...faqItems];
        updatedItems[index].isOpen = !updatedItems[index].isOpen;
        setFaqItems(updatedItems);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.topbar }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backIcon, { tintColor: theme?.colors?.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme?.colors?.text }]}>FAQ'S</Text>
            </View>
            <ScrollView style={[styles.faqContainer, { backgroundColor: theme?.colors?.background }]}>
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
            </ScrollView>
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
        // tintColor: theme?.colors?.icon,
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
