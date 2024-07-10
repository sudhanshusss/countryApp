import React from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FilterItem, FiltersProps } from '../types';
import { ScrollView } from 'react-native-gesture-handler';

const FilterObject = [{
    sectionTitle: "Quick Filter",
    filters: [
        { text: 'Landlocked', key: "landlocked", value: true },
        { text: 'Non UN Member', key: "unMember", value: false },
        { text: 'UN Member', key: "unMember", value: true },
        { text: 'Independent', key: "independent", value: true },
        { text: 'Not Independent', key: "independent", value: false }
    ]
}, {
    sectionTitle: "Region",
    filters: [
        { text: 'Oceania', key: 'region', value: 'Oceania' },
        { text: 'Europe', key: 'region', value: 'Europe' },
        { text: 'Africa', key: 'region', value: 'Africa' },
        { text: 'Americas', key: 'region', value: 'Americas' },
        { text: 'Asia', key: 'region', value: 'Asia' },
        { text: 'Antarctic', key: 'region', value: 'Antarctic' }
    ]
}, {
    sectionTitle: "Sub Region",
    filters: [
        { text: 'Polynesia', key: 'subregion', value: 'Polynesia' },
        { text: 'Northern Europe', key: 'subregion', value: 'Northern Europe' },
        { text: 'Western Europe', key: 'subregion', value: 'Western Europe' },
        { text: 'Western Africa', key: 'subregion', value: 'Western Africa' },
        { text: 'Eastern Africa', key: 'subregion', value: 'Eastern Africa' },
        { text: 'Australia and New Zealand', key: 'subregion', value: 'Australia and New Zealand' },
        { text: 'North America', key: 'subregion', value: 'North America' },
        { text: 'Eastern Europe', key: 'subregion', value: 'Eastern Europe' },
        { text: 'South America', key: 'subregion', value: 'South America' },
        { text: 'Northern Africa', key: 'subregion', value: 'Northern Africa' },
        { text: 'Middle Africa', key: 'subregion', value: 'Middle Africa' },
        { text: 'South-Eastern Asia', key: 'subregion', value: 'South-Eastern Asia' },
        { text: 'Southern Europe', key: 'subregion', value: 'Southern Europe' },
        { text: 'Eastern Asia', key: 'subregion', value: 'Eastern Asia' },
        { text: 'Caribbean', key: 'subregion', value: 'Caribbean' },
        { text: 'Southern Asia', key: 'subregion', value: 'Southern Asia' },
        { text: 'Melanesia', key: 'subregion', value: 'Melanesia' },
        { text: 'Western Asia', key: 'subregion', value: 'Western Asia' },
        { text: 'Central Europe', key: 'subregion', value: 'Central Europe' },
        { text: 'Southeast Europe', key: 'subregion', value: 'Southeast Europe' },
        { text: 'Central America', key: 'subregion', value: 'Central America' },
        { text: 'Micronesia', key: 'subregion', value: 'Micronesia' },
        { text: 'Central Asia', key: 'subregion', value: 'Central Asia' },
        { text: 'Southern Africa', key: 'subregion', value: 'Southern Africa' }
    ]
}, {
    sectionTitle: "Start of week",
    filters: [
        { text: 'monday', key: 'startOfDay', value: 'monday' },
        { text: 'sunday', key: 'startOfDay', value: 'sunday' },
        { text: 'saturday', key: 'startOfDay', value: 'saturday' }
    ]
}];

const Filters = (props: FiltersProps) => {
    const { activeFilters = [], updateFilters, clearFilters, apply } = props;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {FilterObject.map((item, index) => (
                    <View key={item.sectionTitle} style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{item.sectionTitle}</Text>
                        <View style={styles.filtersContainer}>
                            {item.filters.map((filter: FilterItem) => {
                                const isActive = activeFilters[filter.key] === filter.value;
                                return (
                                    <TouchableOpacity
                                        key={filter.text}
                                        style={[
                                            styles.filterButton,
                                            isActive && styles.activeFilterButton
                                        ]}
                                        onPress={() => updateFilters?.(filter)}
                                    >
                                        <Text style={[
                                            styles.filterText,
                                            isActive && styles.activeFilterText
                                        ]}>{filter.text}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <Button title='Clear All' onPress={clearFilters} />
                <Button title='Apply' onPress={apply} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 24,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontFamily: "Duru Sans",
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
        fontWeight: "bold",
    },
    filtersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: "rgba(190, 190, 190, 1)",
        borderRadius: 10,
        height: 30,
    },
    activeFilterButton: {
        borderColor: "rgba(90, 189, 181,1)",
        borderBottomWidth: 2,
    },
    filterText: {
        fontFamily: "Duru Sans",
        fontSize: 12,
        color: 'black',
    },
    activeFilterText: {
        color: "rgba(90, 189, 181,1)",
    },
    footer: {
        width: '100%',
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
});

export default Filters;
