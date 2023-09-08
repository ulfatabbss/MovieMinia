import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { White } from '../utillis/theme';

const MyWrapper = ({ children }) => {
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={White} />
            {children}
        </ScrollView>
    );
};

export default MyWrapper;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: White },
});