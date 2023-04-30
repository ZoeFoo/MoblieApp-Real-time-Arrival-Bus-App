import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Loading from "../components/Loading";
import BusToStopETAItem from '../components/bus/BusToStopETAItem';
import Map from "../components/Map";

import api from '../services';

export default function BusStopScreen({ navigation, route }) {
    console.log({ route });
    const selectData = (route.params ?? {})['selectData'];

    const [stopDetail, setStopDetail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await api.getBusStopDetail(selectData);

            setStopDetail(data.data);
            setIsLoading(false);
        })()
    }, []);

    if (isLoading) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {stopDetail.name_tc}
                </Text>

                <View style={{ height: 300 }}>
                    <Map />
                </View>

                <View style={styles.itemContainer}>
                    <BusToStopETAItem
                        stopName={stopDetail.name_tc}
                        whichStop={selectData}
                    />
                </View>
            </View>
        </ScrollView>
    );

    //return isLoading ?
    // (<View>...</View>) :
    // (<View>...</View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        backgroundColor: 'white',
    }
});