import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { RF } from '../utillis/theme/Responsive'

const BannersAdd = ({ id }) => {
    return (
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: RF(5), alignSelf: 'center' }}>
            <BannerAd size={BannerAdSize.BANNER} unitId={id} />
        </View>
    )
}

export default BannersAdd

const styles = StyleSheet.create({})