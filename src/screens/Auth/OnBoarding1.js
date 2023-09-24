import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { Gray200, Gray300, Secondary, Primary } from '../../utillis/theme';
import { arrow, onBoard1, onBoard2, onBoard3 } from '../../assets';
import { RF } from '../../utillis/theme/Responsive';
import HeadingText from '../../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../redux/store';
import { setIsFirstTime } from '../../redux/reducers/userReducers';

const OnBoarding1 = ({ navigation }) => {
    const [value, setValue] = useState(1); // Initialize as a number
    const Toggle = () => {
        let nextValue = value + 1;
        if (nextValue > 3) {
            store.dispatch(setIsFirstTime(false))
        }
        setValue(nextValue);
    };

    return (
        <ImageBackground
            style={styles.container}
            resizeMode={value == '1' ? 'cover' : value == '2' ? 'cover' : 'contain'}
            imageStyle={
                value == '3'
                    ? styles.imageStyle
                    : { height: '100%', width: '100%' }
            }
            source={value === 1 ? onBoard1 : value === 2 ? onBoard2 : onBoard3}>
            <View
                style={[
                    styles.fadeView,
                    {
                        backgroundColor: value === 3 ? null : 'rgba(0, 0, 0, 0.5)',
                    },
                ]}>
                <TouchableOpacity onPress={() => store.dispatch(setIsFirstTime(false))} style={styles.topBar}>
                    <HeadingText
                        title={value === 3 ? null : 'Skip'}
                        semiBold
                        size={RF(18)}
                        color={value === 3 ? 'black' : '#fff'}
                    />
                </TouchableOpacity>

                <View style={styles.content}>
                    <HeadingText
                        title={
                            value === 1
                                ? 'Unlock Cinematic Wonders!'
                                : value === 2
                                    ? 'Your Movie Journey Starts Here!'
                                    : 'Movies, Curated Your Way!'
                        }
                        bold
                        size={RF(18)}
                        color={value === 3 ? '#000' : '#fff'}
                    />
                    <HeadingText
                        title={
                            value === 1
                                ? 'Dive into a world of movies tailored just for you. Discover, select, and enjoy with ease.'
                                : value === 2
                                    ? "Let us guide you through a seamless movie-watching experience. From discovery to delight, we've got you covered."
                                    : 'Personalized recommendations, hassle-free selection. Elevate your movie nights with our intuitive app.'
                        }
                        medium
                        top={10}
                        size={RF(14)}
                        color={value === 3 ? '#000' : '#fff'}
                    />

                    <View style={styles.bottomComponent}>
                        <View style={styles.indicatorContainer}>
                            {[1, 2, 3].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => setValue(num)}
                                    style={[
                                        styles.indicator,
                                        {
                                            backgroundColor:
                                                value === num ? Secondary : Gray200,
                                        },
                                    ]}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.arrowContainer}
                            onPress={Toggle}>
                            <Image
                                style={styles.arrowImage}
                                source={arrow}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%', width: '100%',
    },
    coverImageStyle: {
        height: RF(350),
        marginTop: RF(150),
        justifyContent: 'center',
    },
    imageStyle: {
        height: RF(350),
        marginTop: RF(150),
        justifyContent: 'center',
    },
    fadeView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        padding: 20,
    },
    topBar: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: RF(10),

    },
    content: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: RF(40),
    },
    bottomComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: RF(20),
    },
    indicatorContainer: {
        flexDirection: 'row',
    },
    indicator: {
        height: RF(7),
        width: RF(25),
        marginLeft: RF(5),
        borderRadius: 5,
    },
    arrowContainer: {
        height: RF(38),
        width: RF(60),
        borderRadius: RF(40),
        backgroundColor: Primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowImage: {
        width: RF(25),
    },
});

export default OnBoarding1;
