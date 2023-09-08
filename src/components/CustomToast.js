import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const CustomToast = () => {
    const showToast = () => {
        Toast.show({
            type: 'success', // success, error, info, or any custom type
            text1: 'Hello',
            text2: 'This is a toast message!',
            position: 'bottom', // top, center, or bottom
            visibilityTime: 2000, // duration in milliseconds
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={showToast} style={{ padding: 10, backgroundColor: '#007AFF' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Show Toast</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomToast;
