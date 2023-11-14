import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import WebView from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const Player1 = ({ route }) => {
    const { url } = route.params;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    useEffect(() => {
        if (loaded) {
            rewarded.show()
        }
    }, [loaded])
    return (
        <View style={{ flex: 1 }}>
            {loaded &&
                <RewardedAdComponent />}
            {url ? (
                <WebViewComponent url={url} />
            ) : (
                <LottieView
                    source={require('../../assets/animation_lktc5fa8.json')}
                    autoPlay
                    loop
                />
            )}
        </View>
    );
};

const RewardedAdComponent = () => {
    // Display your rewarded ad component here
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
            title="Show Rewarded Ad"
            onPress={() => {
                rewarded.show();
            }}
        />
    </View>;
};

const WebViewComponent = ({ url }) => {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: url,
                }}
                allowsFullscreenVideo
                style={styles.mediaPlayer}
                scrollEnabled={false}
                mediaPlaybackRequiresUserAction={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mediaPlayer: {
        height: 300,
    },
});

export default Player1;
