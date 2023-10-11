import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useMiniPlayer } from '../components/MiniPlayerContext';
import WebView from 'react-native-webview';
import { RF } from '../utillis/theme/Responsive';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const MiniPlayer = () => {
    const { miniPlayerVisible, setVideoUrl, toggleMiniPlayer } = useMiniPlayer();
    const miniPlayerState = useSelector((state) => state.root.miniPlayer);
    const { isPlaying, videoUrl } = miniPlayerState;

    const miniPlayerHeight = RF(150);
    const miniPlayerWidth = RF(250);

    const [translateX] = useState(new Animated.Value(0));
    const [translateY] = useState(new Animated.Value(0));

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
        { useNativeDriver: false }
    );

    const closeMiniPlayer = () => {
        setVideoUrl('');
        toggleMiniPlayer();
    };

    if (!miniPlayerVisible) {
        return null; // Hide the mini player if not visible
    }

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent} minDist={10} minPointers={1}>
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 5,
                    height: miniPlayerHeight,
                    width: miniPlayerWidth,
                    transform: [
                        { translateX: translateX },
                        { translateY: translateY },
                    ],
                }}
            >
                <WebView
                    source={{
                        uri: videoUrl,
                    }}
                    allowsLinkPreview={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    allowsFullscreenVideo
                    javaScriptEnabled={true}
                />
                <TouchableOpacity onPress={closeMiniPlayer} style={{ position: 'absolute', top: 5, right: 5 }}>
                    <Image source={{ uri: 'https://img.icons8.com/?size=96&id=pNXET7bXhanM&format=png' }} style={{ height: RF(20), width: RF(20), tintColor: 'red' }} />
                </TouchableOpacity>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default MiniPlayer;
