import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { HP, RF, WP } from '../utillis/theme/Responsive';

const ExpandCard = ({ item, data, navigation, type }) => {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MovieDiscription', {
                    item: item,
                    data: type === 'show' ? item : data,
                    type: type,
                })
            }
            style={styles.container}
        >
            <ImageBackground
                source={{ uri: item.poster[0]?.image }}
                style={styles.imageBackground}
                resizeMode={'cover'}
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.gradientOverlay}
                />
                <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default ExpandCard;

const styles = StyleSheet.create({
    container: {
        width: WP(45),
        height: HP(25),
        borderRadius: 10,
        margin: 5,
        overflow: 'hidden',
        flexShrink: 0,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject
    },
    title: {
        color: '#FFFFFF',
        fontSize: RF(12),
        fontFamily: 'Raleway-Bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingHorizontal: 5,
    },
});
