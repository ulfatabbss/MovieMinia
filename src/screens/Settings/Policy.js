import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { backErrow } from '../../assets'
import { Heading, smalltext, text } from '../../utillis/styles'
const Policy = ({ navigation }) => {
    const { myTheme, } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme.colors.topbar }]}>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.img1, { tintColor: theme?.colors?.icon }]}
                            resizeMode='contain'
                            source={backErrow}></Image>

                    </TouchableOpacity>
                    <Text
                        style={[heading.h4, { marginLeft: '5%', color: theme?.colors?.text }]}>Privacy Policy

                    </Text>

                </View>


            </View>
            <View
                style={[styles.V5, { backgroundColor: theme?.colors?.background }]}>
                <ScrollView
                    style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}>
                    <Text
                        style={{ ...text, color: theme?.colors?.text, paddingBottom: 100 }}>
                        <Text style={{ ...Heading }}>
                            1. Introduction
                        </Text>
                        {'\n'}{'\n'}

                        Welcome to Movie Minia! This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our mobile application ("App"). Please take a moment to read this policy to understand how we handle your data.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            2. Information We Collect
                        </Text>
                        {'\n'}
                        {'\n'}
                        2.1 Personal Information: We may collect certain personal information that you voluntarily provide when using our App. This may include your name, email address, username, and other information you provide when registering or using our services.
                        {'\n'}
                        {'\n'}
                        2.2 Usage Information: We collect data about how you interact with our App, including your device information, IP address, location data, and app usage statistics. This information helps us improve our services and user experience.
                        {'\n'}  {'\n'}
                        <Text style={{ ...Heading }}>
                            3. How We Use Your Information
                        </Text>
                        {'\n'}
                        {'\n'}
                        3.1 Providing Services: We use your personal information to provide you with the services offered by our App, such as personalized recommendations, user authentication, and communication.
                        {'\n'}
                        3.2 Improving the App: We analyze usage patterns to enhance our App's features, content, and functionality. This includes using your information to fix technical issues and improve user experience.
                        {'\n'}
                        3.3 Communication: We may use your contact information to send you important updates, newsletters, and marketing materials related to Movie Minia. You can opt-out of these communications at any time.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            4. Sharing Your Information
                        </Text>
                        {'\n'}
                        {'\n'}
                        We do not sell or rent your personal information to third parties. However, we may share your information with:
                        {'\n'}
                        {'\n'}
                        4.1 Service Providers: We may engage third-party service providers to assist with app development, hosting, analytics, and other services. These providers may access your information to perform their functions but are obligated to keep it confidential.
                        {'\n'}
                        {'\n'}
                        4.2 Legal Requirements: We may disclose your information when required by law, such as to comply with a legal process, respond to government requests, or protect our rights, privacy, safety, or property.
                        {'\n'}  {'\n'}
                        <Text style={{ ...Heading }}>
                            5. Your Choices
                        </Text>
                        {'\n'}
                        {'\n'}
                        5.1 Access and Control: You can access, correct, or delete your personal information through the App's settings. You may also contact us to exercise your rights under applicable data protection laws.
                        {'\n'}
                        {'\n'}
                        5.2 Opt-Out: You can opt-out of marketing communications by following the instructions in the messages you receive or by contacting us directly.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            6. Security
                        </Text>
                        {'\n'}
                        {'\n'}
                        We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            7. Changes to this Privacy Policy
                        </Text>
                        {'\n'}
                        {'\n'}
                        We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through the App or other means.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}> 8. Contact Us</Text>
                        {'\n'}
                        {'\n'}

                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at movieminia@webevis.com.
                        {'\n'}
                        {'\n'}
                        Please remember to customize this template according to your app's specific data collection and processing activities and ensure it complies with relevant privacy laws and regulations in your jurisdiction. It's also essential to keep your privacy policy up to date and notify users of any changes. Consulting with a legal expert is recommended for complete legal compliance.
                    </Text>

                </ScrollView>


            </View>
        </SafeAreaView>
    )
}

export default Policy

const styles = StyleSheet.create({
    V1: {
        flex: 1,

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
    }, V5: { height: '100%' },
})