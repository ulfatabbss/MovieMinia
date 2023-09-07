import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Heading } from '../utillis/styles';
import { Primary } from '../utillis/colors';
import { RF } from '../utillis/theme/Responsive';

const Button = ({ title, screen }) => {
    return (
        <TouchableOpacity
            onPress={screen}
            style={{
                width: '100%',
                height: RF(48),
                borderRadius: 60,
                backgroundColor: Primary,
            }}>
            <Text
                style={{
                    ...Heading,
                    color: '#fff',
                    fontSize: RF(16),
                    textAlign: 'center',
                    marginTop: RF(10),
                }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({});