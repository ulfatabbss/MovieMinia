import React, { useState } from 'react';
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
const shimmerColors1 = ['#0000', 'rgba(255, 255, 255, 0.1)', '#0000'];


const ScreenPreLoader = () => {
    const { myTheme } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [change, setChange] = useState(myTheme == 'lightTheme' ? shimmerColors : shimmerColors1)
    const renderShimmerSection = (height) => {
        return (
            <ShimmerPlaceholder
                duration={2000}
                shimmerColors={change}
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ShimmerPlaceholder duration={2000}
                    shimmerColors={change} style={styles.logo} />
                <View style={styles.iconContainer}>
                    <ShimmerPlaceholder duration={2000}
                        shimmerColors={change} style={styles.logoutIcon} />
                </View>
            </View>

            {renderShimmerSection(172)}
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
