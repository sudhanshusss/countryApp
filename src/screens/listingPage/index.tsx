import axios from "axios";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import ListingItem from "./components/ListingItem";
import SearchBox from "./components/SearchBox";
import { FlashList } from "@shopify/flash-list";
import BottomSheet from "@gorhom/bottom-sheet";
import Filters from "./components/Filters";
import EmptyState from "./components/EmptyState";
import Loader from "./components/Loader";
import { Country, FilterItem } from "./types";
import { debounce } from "./utils";

const BASE_URL = "https://restcountries.com/v3.1";

const ListingPage = () => {
    const [countryList, setCountryList] = useState<Country[]>([]);
    const [finalCountryList, setFinalCountryList] = useState<Country[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string | boolean }>({});
    const [loading, setLoading] = useState(false);
    const [isBottomsheetVisible, setBottomsheetVisible] = useState(false);

    const getCountryList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/all`);
            setCountryList(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            Alert.alert("Something went wrong");
        }
    };

    useEffect(() => {
        getCountryList();
    }, []);

    const sheetRef = useRef<any>(null);

    const updateFilters = useCallback((filter: FilterItem) => {
        // Resetting search box when any filter is added by a user
        setSearchKeyword("");
        const newActiveFilter = { ...activeFilters };
        if (newActiveFilter[filter.key] === filter.value) {
            delete newActiveFilter[filter.key];
        } else {
            newActiveFilter[filter.key] = filter.value;
        }
        setActiveFilters(newActiveFilter);
    }, [activeFilters]);

    // Called when text is changed in search box
    const updateSearchQuery = useCallback((value: string) => {
        // We are removing all active filters for sake of simple UX

        debouncedFetch(value);
        setActiveFilters({});
        setSearchKeyword(value);
    }, []);

    // Debounced API call for fetching name
    const debouncedFetch = debounce(async (name: any) => {
        try {
            if (!name) {
                setFinalCountryList(countryList)
                return
            }
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/name/${name}?fullText=false`);
            const countries = response.data;
            setFinalCountryList(countries);
        } catch (err) {
            console.log(err);
            setFinalCountryList([]);
        } finally {
            setLoading(false);
        }
    }, 500);

    // Updating list after applying all filters
    const updateFilteredData = () => {
        const filteredCountries = countryList.filter((country: any) => {
            let truth = true;
            // Look for all the keys in filters for match with given countries
            Object.keys(activeFilters).forEach((item) => {
                truth = truth && country[item] === activeFilters[item];
            });
            return truth;
        });
        setFinalCountryList(filteredCountries);
    };

    useEffect(() => {
        if (!searchKeyword) {
            console.log(searchKeyword)
            setFinalCountryList(countryList);
        }
    }, [searchKeyword, countryList]);

    const renderItem = useCallback(({ item, index }: { item: Country; index: number }) => {
        return <ListingItem {...item} />;
    }, []);

    const snapPoints = ['90%'];

    const clearFilters = useCallback(() => {
        setActiveFilters({});
        setSearchKeyword("");
        closeBottomSheet();
        setFinalCountryList(countryList);
    }, [countryList]);

    const closeBottomSheet = () => {
        sheetRef?.current?.close();
        setBottomsheetVisible(false);
    };

    const applyFilters = useCallback(() => {
        updateFilteredData();
        closeBottomSheet();
    }, [activeFilters]);

    const openBottomSheet = useCallback(() => {
        setBottomsheetVisible(true);
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index !== -1) {
            sheetRef.current.snapToIndex(index);
        } else {
            setBottomsheetVisible(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <SearchBox openFilters={openBottomSheet} keyword={searchKeyword} setSearchKeyword={updateSearchQuery} />
            <Text style={styles.resultsText}>Showing {finalCountryList.length} results</Text>
            {loading ? (
                <Loader />
            ) : finalCountryList?.length === 0 ? (
                <EmptyState onPress={clearFilters} />
            ) : (
                <FlashList
                    bounces={true}
                    horizontal={false}
                    estimatedItemSize={122}
                    data={finalCountryList}
                    renderItem={renderItem}
                />
            )}
            {isBottomsheetVisible ? (
                <BottomSheet
                    ref={sheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onClose={() => {
                        sheetRef.current?.close();
                    }}
                    enablePanDownToClose
                    onChange={handleSheetChanges}
                >
                    <View style={styles.bottomSheetContainer}>
                        <Filters clearFilters={clearFilters} apply={applyFilters} activeFilters={activeFilters} updateFilters={updateFilters} />
                    </View>
                </BottomSheet>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
    resultsText: {
        paddingLeft: 10,
        fontFamily: "Duru Sans",
        fontSize: 16,
        paddingBottom: 10,
    },
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ListingPage;
