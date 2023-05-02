import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'

import Loading from "../Loading";

import api from '../../services';

const BusToStopETAItem = ({ stopName, whichStop }) => {
    const now = moment(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [stopETAData, setStopETAData] = useState({});

    useEffect(() => {
        (async () => {
            const data = await api.getBusStopETA(`${whichStop}`);
            const etaData = await data.data;
            //console.log(etaData)

            const groupByRoute = await etaData.reduce((group, routes) => {
                const { route } = routes;
                group[route] = group[route] ?? [];
                group[route].push(routes);
                return group;
            }, {});

            setStopETAData(groupByRoute);
            setIsLoading(false);
        })()
    }, []);

    return (
        <View>
            {stopETAData ?
                Object.keys(stopETAData).map((key, i) => {
                    const routes = stopETAData[key];

                    return (
                        <Item key={i}
                            stopName={stopName}
                            routeNum={key}
                            routes={routes}
                        />
                    )
                }) : (<View style={styles.loadingContainer}>
                    <Loading />
                </View>)
            }
        </View>
    )
};

const Item = ({ stopName, routeNum, routes }) => {
    const route = routes[0];
    if (!route) return null;
    console.log(route)

    const isETA = () => {
        switch (true) {
            case (route.rmk_tc == '服務只限於星期日及公眾假期' && route.eta == null):
                return (
                    <View style={{ paddingTop: '3%' }}>
                        <Text style={styles.etaText}>
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                color={'#005eb2'}
                                size={32}/>
                        </Text>
                    </View>
                )
                break;
            case (route.eta !== null):
                return (
                    <View>
                        <Text style={styles.etaText}>
                            {/*{route.eta}*/}
                        </Text>
                        <Text style={styles.minText}>分鐘</Text>
                    </View>
                )
                break;
            default:
                return (
                    <View>
                        <Text style={styles.etaText}> - </Text>
                        <Text style={styles.minText}>分鐘</Text>
                    </View>
                )
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.routeNumContainer}>
                <Text style={styles.routeNumText}>
                    {routeNum}
                </Text>
            </View>

            <View style={styles.routeDetailContainer}>
                <View style={styles.origContainer}>
                    <Text style={{ textAlignVertical: 'bottom' }}>往</Text>
                    <Text style={styles.origText}>
                        {route.dest_tc}
                    </Text>
                </View>

                <View style={styles.stopContainer}>
                    <Text style={styles.stopText}>
                        {stopName}
                    </Text>
                </View>
            </View>

            <View style={styles.etaContainer}>
                {isETA()}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
    },
    routeNumContainer: {
        width: '20%',
        justifyContent: 'center',
    },
    routeNumText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    routeDetailContainer: {
        width: '60%',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    origContainer: {
        flexDirection: 'row',
    },
    origText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    stopContainer: {},
    stopText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    etaContainer: {
        width: '20%',
        justifyContent: 'center',
    },
    etaText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#005eb2',
        textAlign: 'right',
        paddingRight: '10%',
    },
    minText: {
        textAlign: 'right',
        paddingRight: '10%',
    }
});

export default BusToStopETAItem;