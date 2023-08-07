import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { MovieView } from '../utillis/styles'

const MainCard = ({ item, data, navigation, type }) => {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MovieDiscription', {
                    item: item,
                    data: type == 'show' ? item : data,
                    type: type,
                })
            }
            style={MovieView}>
            <ImageBackground
                // resizeMode="cover"
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-end',
                }}
                source={{ uri: item.poster[0].image }}>
                <View
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        width: '100%',
                        height: '20%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        padding: 4,
                    }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'BebasNeue-Regular',
                        }}>
                        {item.title}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default MainCard

const styles = StyleSheet.create({})