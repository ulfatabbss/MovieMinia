import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import MainCard from './MainCard';
import { smalltext, Heading } from '../utillis/styles';

const CardsFlatlist = ({ navigation, heading, data, type }) => {
    return (
        <View>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                <Text style={Heading}>{heading}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ExpandMovies', {
                            data: data, type: type

                        });
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        justifyContent: 'flex-end',
                        marginTop: 10,
                        marginRight: 10,
                    }}>
                    <Text style={smalltext}>More</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data?.slice(0, 10)}
                renderItem={({ item }) =>
                    MainCard({ item: item, data: type == 'show' ? item : data, navigation: navigation, type: type })
                }
            />
        </View>
    )
}

export default CardsFlatlist

const styles = StyleSheet.create({})