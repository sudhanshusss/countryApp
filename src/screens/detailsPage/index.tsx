import React from "react";
import { Dimensions, Image, Text, View, ScrollView, Linking, StyleSheet, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { capitalizeFirstLetter } from "../listingPage/utils";
import DescriptionItem from "./components.tsx/DescriptionItem";
import { Country } from "../listingPage/types";

interface CountryDetailPageProps {
    route: { params: Country };
}

const CountryDetailPage: React.FC<CountryDetailPageProps> = ({ route }) => {
    const country: Country | undefined = route.params;
    const languages = Object.keys(country?.languages ?? {}).map((item) => country?.languages[item]);
    const currencies = Object.keys(country?.currencies ?? {}).map((item) => `${country?.currencies?.[item]?.name} (${country?.currencies?.[item]?.symbol})`);

    const openImage = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: country?.flags?.png }}
                    />
                </View>
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}
                    style={styles.gradientContainer}
                >
                    <Text style={styles.commonName}>{country?.name.common}</Text>
                    <Text style={styles.officialName}>{country?.name.official}</Text>
                    <View style={styles.languagesContainer}>
                        {languages.map((item, index) => (
                            <React.Fragment key={index}>
                                <Text style={styles.languageText}>{item}</Text>
                                {index !== languages.length - 1 && <View style={styles.dot} />}
                            </React.Fragment>
                        ))}
                    </View>
                </LinearGradient>
                <View style={styles.detailsContainer}>
                    <DescriptionItem title="Capital" value={country?.capital?.join(", ") ?? ""} />
                    <DescriptionItem title="Population" value={country?.population?.toString() ?? ""} />
                    <DescriptionItem title="Region" value={country?.region ?? ""} />
                    <DescriptionItem title="Sub-region" value={country?.subregion ?? ""} />
                    <DescriptionItem title="Time zones" value={country?.timezones?.join(", ") ?? ""} />
                    <DescriptionItem title="Area" value={country?.area?.toString() ?? ""} />
                    {country?.coatOfArms?.png &&
                        <DescriptionItem
                            title="Coat of arms"
                            image={country?.coatOfArms.png ?? ""}
                            type="Image"
                            isValueClickable={true}
                            onClick={() => { openImage(country?.coatOfArms?.png ?? "") }}
                        />
                    }
                    <DescriptionItem title="Currencies" value={currencies.join(", ")} />
                    <DescriptionItem title="Start of week" value={capitalizeFirstLetter(country?.startOfWeek ?? "")} />
                    <DescriptionItem title="Landlocked" value={country?.landlocked ? "Yes" : "No"} />
                    <DescriptionItem title="Independent" value={country?.independent ? "Yes" : "No"} />
                    <DescriptionItem title="UN Member" value={country?.unMember ? "Yes" : "No"} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContainer: {
        paddingBottom: 40,
    },
    imageContainer: {
        width: "100%",
        height: Dimensions.get("window").height / 3,
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: "100%",
        backgroundColor: 'red',
    },
    gradientContainer: {
        width: '100%',
        marginTop: -90,
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    commonName: {
        color: "white",
        fontFamily: "Duru Sans",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: -2,
    },
    officialName: {
        color: "white",
        fontFamily: "Duru Sans",
        fontSize: 16,
        marginTop: 6,
    },
    languagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    languageText: {
        color: "white",
        fontFamily: "Duru Sans",
        fontSize: 12,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "white",
        marginHorizontal: 4,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: "#f5f5f5",
        paddingTop: 30,
        borderRadius: 20,
        marginTop: -30,
        paddingHorizontal: 24,
    },
});

export default CountryDetailPage;
