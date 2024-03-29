import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';

// Utility function to create a shimmer component
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const shimmerColors = ['#ebebeb', 'rgba(0, 0, 0, 0.1)', '#ebebeb'];

const ScreenPreLoader = () => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ShimmerPlaceholder style={styles.logo} />
                <View style={styles.iconContainer}>
                    <ShimmerPlaceholder style={styles.logoutIcon} />
                </View>
            </View>

            {renderShimmerSection(172)}
            {renderShimmerSection(30)}
            {renderShimmerCards(3, 150, 'card')}
            {renderShimmerSection(30)}

            {renderShimmerCards(3, 150, 'card')}
            {renderShimmerSection(30)}

            {renderShimmerCards(3, 150, 'card')}
        </View>
    );
};

// Render a shimmer section with given height
const renderShimmerSection = (height) => {
    return (
        <ShimmerPlaceholder
            duration={2000}
            shimmerColors={shimmerColors}
            style={{
                width: '100%',
                height: height,
                borderRadius: 10,
                marginVertical: 10,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 14,
                overflow: 'hidden',
            }}
        />
    );
};

// Render shimmer card sections with given count and height
const renderShimmerCards = (count, height, styleName) => {
    const cardStyles = [styles[styleName], { height: height }];

    return (
        <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
            {[...Array(count)].map((_, index) => (
                <ShimmerPlaceholder
                    key={index}
                    duration={2000}
                    shimmerColors={shimmerColors}
                    style={cardStyles}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    logo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    logoutIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    card: {
        height: 150,
        width: '40%',
        borderRadius: 10,
        flexShrink: 0,
    },
    Lastcard: {
        height: 150,
        width: '15%',
        flexShrink: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
});

export default ScreenPreLoader;
