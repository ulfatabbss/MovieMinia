import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import LottieView from 'lottie-react-native';

const Player1 = ({ route }) => {
    const { url } = route.params;
    // useEffect(() => {
    //     console.log(url);
    // }, [url])
    return (
        <View style={{ flex: 1 }}>
            {url ?
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
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        source={require('../../assets/animation_lktc5fa8.json')} autoPlay loop />
                </View>
            }

        </View>
    )
}

export default Player1

const styles = StyleSheet.create({
    mediaPlayer: {
        height: 300
    }
})