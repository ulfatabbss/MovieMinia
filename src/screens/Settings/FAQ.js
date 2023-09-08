import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import heading from '../../utillis/fonts'
import { useSelector } from 'react-redux'
import { useTheme } from 'react-native-paper'
import lightTheme from '../../utillis/theme/lightTheme'
import darkTheme from '../../utillis/theme/darkTheme'
import { backErrow } from '../../assets'
const Up = require('../../assets/appIcons/up.png')
const Down = require('../../assets/appIcons/down.png')

const Faq = ({ navigation }) => {
    const { myTheme } = useSelector((state) => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [down, setDown] = useState(false)
    const [down1, setDown1] = useState(false)
    const [down2, setDown2] = useState(false)
    const [down3, setDown3] = useState(false)
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme.colors.topbar }]}>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={{ ...styles.img1, tintColor: theme.colors.icon }}
                            resizeMode='contain'
                            source={backErrow} />

                    </TouchableOpacity>
                    <Text
                        style={[heading.h4, { marginLeft: '5%', color: theme.colors.text }]}>FAQ'S

                    </Text>

                </View>


            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <View
                    style={{
                        height: down ? 164 : 45,
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginTop: '10%',
                        borderRadius: 20
                        , backgroundColor: theme.colors.tabs,



                    }}>
                    <View
                        style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 45, backgroundColor: theme.colors.tabs, borderRadius: 20 }}>
                        <Text
                            numberOfLines={1}
                            style={[heading.h6, { marginLeft: '5%', width: '70%', borderBottomWidth: 1, color: theme.colors.text }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</Text>
                        <TouchableOpacity onPress={down ? () => setDown(false) : () => setDown(true)}>
                            <Image
                                style={{ height: 18, width: 18, marginRight: '5%', tintColor: theme.colors.icon }}
                                resizeMode='contain'
                                source={down ? Up : Down}>

                            </Image>

                        </TouchableOpacity>


                    </View>
                    {/* condition true View */}
                    {down ? <View>
                        <View
                            style={{ width: '80%', alignSelf: 'center', backgroundColor: 'gray', height: 1 }}>


                        </View>
                        <Text
                            style={[heading.h7, { alignSelf: 'center', width: '90%', marginTop: '5%', color: theme.colors.text }]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                        </Text>

                    </View>

                        : null}




                </View>
                <View
                    style={{
                        height: down1 ? 164 : 45,
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginTop: '5%',
                        borderRadius: 20
                        , backgroundColor: theme.colors.tabs



                    }}>
                    <View
                        style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                        <Text
                            numberOfLines={1}
                            style={[heading.h6, { marginLeft: '5%', width: '70%', borderBottomWidth: 1, color: theme.colors.text }]}
                        >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</Text>
                        <TouchableOpacity onPress={down1 ? () => setDown1(false) : () => setDown1(true)}>
                            <Image
                                style={{ height: 18, width: 18, marginRight: '5%', tintColor: theme.colors.icon }}
                                resizeMode='contain'
                                source={down1 ? Up : Down}>

                            </Image>

                        </TouchableOpacity>


                    </View>
                    {/* condition true View */}
                    {down1 ? <View>
                        <View
                            style={{ width: '80%', alignSelf: 'center', backgroundColor: 'gray', height: 1 }}>


                        </View>
                        <Text
                            style={[heading.h7, { alignSelf: 'center', width: '90%', marginTop: '5%', color: theme.colors.text }]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                        </Text>

                    </View>

                        : null}




                </View>
                <View
                    style={{
                        height: down2 ? 164 : 45,
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginTop: '5%',
                        borderRadius: 20
                        , backgroundColor: theme.colors.tabs,



                    }}>
                    <View
                        style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                        <Text
                            numberOfLines={1}
                            style={[heading.h6, { marginLeft: '5%', width: '70%', borderBottomWidth: 1, color: theme.colors.text }]}
                        >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</Text>
                        <TouchableOpacity onPress={down2 ? () => setDown2(false) : () => setDown2(true)}>
                            <Image
                                style={{ height: 18, width: 18, marginRight: '5%', tintColor: theme.colors.icon }}
                                resizeMode='contain'
                                source={down2 ? Up : Down}>

                            </Image>

                        </TouchableOpacity>


                    </View>
                    {/* condition true View */}
                    {down2 ? <View>
                        <View
                            style={{ width: '80%', alignSelf: 'center', backgroundColor: 'gray', height: 1 }}>


                        </View>
                        <Text
                            style={[heading.h7, { alignSelf: 'center', width: '90%', marginTop: '5%', color: theme.colors.text }]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                        </Text>
                    </View>

                        : null}
                </View>
                <View
                    style={{
                        height: down3 ? 164 : 45,
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginTop: '5%',
                        borderRadius: 20,
                        backgroundColor: theme.colors.tabs
                    }}>
                    <View
                        style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                        <Text
                            numberOfLines={1}
                            style={[heading.h6, { marginLeft: '5%', width: '70%', borderBottomWidth: 1, color: theme.colors.text }]}
                        >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</Text>
                        <TouchableOpacity onPress={down3 ? () => setDown3(false) : () => setDown3(true)}>
                            <Image
                                style={{ height: 18, width: 18, marginRight: '5%', tintColor: theme.colors.icon }}
                                resizeMode='contain'
                                source={down3 ? Up : Down}>

                            </Image>

                        </TouchableOpacity>


                    </View>
                    {/* condition true View */}
                    {down3 ? <View>
                        <View
                            style={{ width: '80%', alignSelf: 'center', backgroundColor: 'gray', height: 1 }}>


                        </View>
                        <Text
                            style={[heading.h7, { alignSelf: 'center', width: '90%', marginTop: '5%', color: theme.colors.text }]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                        </Text>

                    </View>

                        : null}




                </View>



            </View>

        </SafeAreaView>
    )
}

export default Faq


const styles = StyleSheet.create({
    V1: {
        flex: 1

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
    V6: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '10%',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img2: {
        height: 18, width: 18, marginRight: '5%', marginTop: '5%'
    }
})
