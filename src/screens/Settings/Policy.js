import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../Utilities/Color'
import heading from '../Utilities/font'
import { useSelector } from 'react-redux'

const Policy = ({ navigation }) => {
    const { dark } = useSelector(state => state.root.user);
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: dark ? Color.bg : '#313131' }]}>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.img1, { tintColor: dark ? 'black' : 'white' }]}
                            resizeMode='contain'
                            source={require('../Assets/back.png')}></Image>

                    </TouchableOpacity>
                    <Text
                        style={[heading.h4, { marginLeft: '5%', color: dark ? 'black' : 'white' }]}>Privacy Policy

                    </Text>

                </View>


            </View>
            <View
                style={[styles.V5, { backgroundColor: dark ? Color.prime : 'black' }]}>
                <View
                    style={{ width: '90%', alignSelf: 'center', marginTop: '5%', }}>
                    <Text
                        style={[heading.h5, { color: dark ? 'black' : 'white' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna

                    </Text>
                    <Text
                        style={[heading.h5, { marginTop: '2%', color: dark ? 'black' : 'white' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pecenas pulvinar bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna

                    </Text>
                    <Text
                        style={[heading.h5, { marginTop: '2%', color: dark ? 'black' : 'white' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pecenas pulvinar bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.

                    </Text>
                    <Text
                        style={[heading.h5, { marginTop: '2%', color: dark ? 'black' : 'white' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna magna Lorem ipsum dolor sit amet.

                    </Text>
                    <Text
                        style={[heading.h5, { marginTop: '2%', color: dark ? 'black' : 'white' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>

                </View>


            </View>
        </SafeAreaView>
    )
}

export default Policy

const styles = StyleSheet.create({
    V1: {
        flex: 1,
        backgroundColor: Color.bg

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
    }, V5: { height: '100%', backgroundColor: Color.prime },
})