// MiniPlayer.js
import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useMiniPlayer } from '../components/MiniPlayerContext';
import WebView from 'react-native-webview';
import { RF } from '../utillis/theme/Responsive';
import { PanGestureHandler, State, PinchGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const MiniPlayer = () => {
    const { miniPlayerVisible, setVideoUrl, toggleMiniPlayer } = useMiniPlayer();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const miniPlayerState = useSelector((state) => state.root.miniPlayer);
    const { isPlaying, videoUrl } = miniPlayerState;
    const onGestureEvent = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            setPosition({
                x: nativeEvent.translationX,
                y: nativeEvent.translationY,
            });
        }
    };

    const onPinchGestureEvent = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            // Calculate the scale based on the pinch gesture
            setScale(scale * nativeEvent.scale);
        }
    };

    const closeMiniPlayer = () => {
        setVideoUrl('');
        toggleMiniPlayer();
    };

    if (!miniPlayerVisible) {
        return null; // Hide the mini player if not visible
    }

    // Get the screen dimensions
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Calculate the maximum allowed positions
    const maxX = screenWidth - miniPlayerWidth;
    const maxY = screenHeight - miniPlayerHeight;
    const minX = 0;
    const minY = 0;

    // Calculate the MiniPlayer's width and height based on scale
    const miniPlayerHeight = RF(150) * scale;
    const miniPlayerWidth = RF(250) * scale;

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent} minDist={10} minPointers={1}>
            <View style={{
                flex: 1,
                position: 'absolute',
                bottom: 10,
                right: 5,
                height: miniPlayerHeight,
                width: miniPlayerWidth,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                alignSelf: 'flex-end',
                transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                ],
            }}>
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
            </View>
        </PanGestureHandler>
    );
};

export default MiniPlayer;
