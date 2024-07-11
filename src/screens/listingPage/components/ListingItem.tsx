import React, { useCallback } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Country } from '../types';
import { LanguageIcon, PopulationIcon } from '../../../../assets/svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const ListingItem = (props: Country) => {
    const languages = Object.keys(props?.languages ?? {}).map((item, index) => props.languages[item]);
    const navigation = useNavigation<NavigationProp<any, any>>();
    const handleNavigation = useCallback(() => {
        navigation.navigate("Details", { ...props });
    }, [props])
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={handleNavigation}
            style={styles.touchableOpacity}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image style={styles.flagImage} resizeMode='contain' source={{ uri: props?.flags?.png }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.countryName}>{props?.name?.common}</Text>
                        <Text style={styles.capitalName}>{props?.capital}</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <PopulationIcon width={20} height={20} />
                                <Text style={styles.infoText}>{props?.population}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <LanguageIcon width={20} height={20} />
                                <Text style={styles.infoText}>{languages[0]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        paddingHorizontal: 10,
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    card: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        backgroundColor: "#F5F5F5",
        borderRadius: 24,
        marginTop: 0,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        elevation: 10,
    },
    flagImage: {
        width: 90,
        height: 70,
    },
    textContainer: {
        marginLeft: 10,
    },
    countryName: {
        fontFamily: "Duru Sans",
        fontSize: 16,
        width: 190,
    },
    capitalName: {
        fontFamily: "Duru Sans",
        fontSize: 12,
        width: "70%",
        marginTop: 4,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 4,
    },
    infoText: {
        fontFamily: "Duru Sans",
        fontSize: 12,
        marginLeft: 4,
    },
});

const MemoizedListingItem = React.memo(ListingItem, (prevProps, nextProps) => {
    return prevProps.name.official === nextProps.name.official;
});

export default MemoizedListingItem;
