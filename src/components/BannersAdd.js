import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

const BannersAdd = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 4 }}>
                <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/4396679739"} />
            </View>
        </View>
    )
}

export default BannersAdd

const styles = StyleSheet.create({})