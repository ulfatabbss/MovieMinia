import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import Color from '../../utillis/colors'
import { useSelector } from 'react-redux'
import { backErrow } from '../../assets'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { useTheme } from 'react-native-paper'
import { Heading, smalltext, text } from '../../utillis/styles'
const Terms = ({ navigation }) => {
    const { myTheme, } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme?.colors?.topbar }}>
            <StatusBar backgroundColor={theme?.colors?.topbar} barStyle={myTheme == 'lightTheme' ? 'dark-content' : 'light-content'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.backButton, { tintColor: theme?.colors?.icon }]}
                        resizeMode="contain"
                        source={backErrow}
                    />
                </TouchableOpacity>
                <Text style={{ ...Heading, color: theme?.colors?.text }}>Terms & Conditions</Text>
            </View>
            <View
                style={[styles.V5, { backgroundColor: theme?.colors?.background }]}>
                <ScrollView
                    style={{ width: '90%', alignSelf: 'center', marginTop: '5%', }}>
                    <Text
                        style={{ ...text, color: theme?.colors?.text, paddingBottom: 100 }}>
                        <Text style={{ ...Heading }}>
                            Welcome to Movie Minia!
                        </Text>
                        {'\n'}   {'\n'} These Terms and Conditions ("Terms") govern your use of the Movie Minia mobile application ("App"). By accessing or using the App, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please refrain from using the App.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            1. User Eligibility
                        </Text>
                        {'\n'}
                        {'\n'}
                        1.1 Age Requirement: You must be at least 18 years old or the age of majority in your jurisdiction to use the App. If you are under the specified age, you may only use the App with the consent of a parent or legal guardian.
                        {'\n'}
                        1.2 Account Creation: To access certain features of the App, you may be required to create an account. You agree to provide accurate and complete information during the registration process.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            2. Use of the App
                        </Text>
                        {'\n'}
                        {'\n'}
                        2.1 License: Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use the App for personal and non-commercial purposes.
                        {'\n'}
                        2.2 Prohibited Activities: You agree not to:
                        {'\n'}
                        a. Use the App for any illegal or unauthorized purpose.   {'\n'}
                        b. Violate any applicable laws, regulations, or third-party rights.   {'\n'}
                        c. Interfere with the operation of the App, including distributing malware or engaging in disruptive activities.   {'\n'}
                        d. Access, modify, or use any part of the App that you are not authorized to access.   {'\n'}
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            3. Content and Intellectual Property
                        </Text>
                        {'\n'}
                        {'\n'}
                        3.1 Content Ownership: All content available on the App, including but not limited to text, images, videos, and software, is owned or licensed by Movie Minia and protected by intellectual property laws.
                        {'\n'}
                        3.2 User-Generated Content: By submitting or posting user-generated content on the App, you grant Movie Minia a worldwide, royalty-free, perpetual, and irrevocable license to use, display, and distribute your content for the purposes of operating and improving the App.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            4. Privacy and Data Collection
                        </Text>
                        {'\n'}
                        {'\n'}
                        4.1 Privacy Policy: Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review the Privacy Policy to understand our data practices.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            5. Subscription and Payments
                        </Text>
                        {'\n'}
                        {'\n'}
                        5.1 Premium Subscription: Movie Minia may offer a premium subscription service with additional features. Your subscription is subject to the terms and pricing provided during the subscription process.
                        {'\n'}
                        5.2 Billing: Subscriptions are billed on a recurring basis, and you agree to pay all applicable fees associated with your subscription. Payments are processed through your app store account.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            6. Termination
                        </Text>
                        {'\n'}
                        {'\n'}
                        6.1 Termination by Movie Minia: Movie Minia reserves the right to terminate or suspend your access to the App, with or without notice, for any reason, including a breach of these Terms.
                        {'\n'}
                        6.2 Termination by User: You can stop using the App at any time. To terminate your account, please contact our customer support or follow the instructions within the App.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            7. Disclaimer of Warranties
                        </Text>
                        {'\n'}
                        {'\n'}
                        7.1 Use at Your Own Risk: You acknowledge and agree that the App is provided "as is" and "as available." Movie Minia makes no warranties, express or implied, regarding the App's accuracy, reliability, or availability.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            8. Limitation of Liability
                        </Text>
                        {'\n'}
                        {'\n'}

                        8.1 Indirect Damages: To the extent permitted by applicable law, Movie Minia shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the App.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            9. Changes to Terms
                        </Text>
                        {'\n'}
                        {'\n'}
                        9.1 Updates: Movie Minia may update these Terms from time to time. We will notify you of any material changes through the App or other means. Your continued use of the App after such changes constitutes acceptance of the updated Terms.
                        {'\n'}
                        {'\n'}
                        <Text style={{ ...Heading }}>
                            10. Contact Information
                        </Text>
                        {'\n'}
                        {'\n'}
                        If you have any questions or concerns about these Terms and Conditions, please contact us at movieminia@webevis.com.
                    </Text>

                </ScrollView>


            </View>
        </SafeAreaView >
    )
}

export default Terms

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
    header: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 10
        // justifyContent: 'space-between',
    },
    backButton: {
        height: 25,
        width: 20,
        alignSelf: 'center',
    },
})