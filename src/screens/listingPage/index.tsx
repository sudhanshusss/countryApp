import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
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
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string | boolean }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isBottomsheetVisible, setBottomsheetVisible] = useState<boolean>(false);

    const getCountryList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/all`);
            setCountryList(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Failed to fetch country list.");
            console.error("Error fetching country list:", error);
        }
    };

    useEffect(() => {
        getCountryList();
    }, []);

    const sheetRef = useRef<BottomSheet>(null);

    const updateFilters = useCallback((filter: FilterItem) => {
        setSearchKeyword("");
        const newActiveFilter = { ...activeFilters };
        if (newActiveFilter[filter.key] === filter.value) {
            delete newActiveFilter[filter.key];
        } else {
            newActiveFilter[filter.key] = filter.value;
        }
        setActiveFilters(newActiveFilter);
    }, [activeFilters]);

    const updateSearchQuery = useCallback((value: string) => {
        debouncedFetch(value);
        setActiveFilters({});
        setSearchKeyword(value);
    }, []);

    const debouncedFetch = useRef(debounce(async (name: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/name/${name}?fullText=false`);
            setFinalCountryList(response.data);
        } catch (error) {
            console.error("Error fetching countries by name:", error);
        } finally {
            setLoading(false);
        }
    }, 500)).current;

    const updateFilteredData = useCallback(() => {
        const filteredCountries = countryList.filter((country: any) => {
            return Object.keys(activeFilters).every((key) => country[key] === activeFilters[key]);
        });
        setFinalCountryList(filteredCountries);
    }, [activeFilters, countryList]);

    useEffect(() => {
        if (!searchKeyword) {
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
        setFinalCountryList(countryList)
    }, [countryList]);

    const closeBottomSheet = useCallback(() => {
        sheetRef.current?.close();
        setBottomsheetVisible(false);
    }, []);

    const applyFilters = useCallback(() => {
        updateFilteredData();
        closeBottomSheet();
    }, [updateFilteredData]);

    const openBottomSheet = useCallback(() => {
        setBottomsheetVisible(true);
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index !== -1) {
            sheetRef.current?.snapToIndex(index);
        } else {
            setBottomsheetVisible(false);
        }
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <SearchBox openFilters={openBottomSheet} keyword={searchKeyword} setSearchKeyword={updateSearchQuery} />
                <Text style={styles.resultsText}>Showing {finalCountryList.length} results</Text>
                {loading ? <Loader /> : finalCountryList.length === 0 ? <EmptyState onPress={clearFilters} /> :
                    <FlashList
                        bounces
                        horizontal={false}
                        estimatedItemSize={122}
                        data={finalCountryList}
                        renderItem={renderItem}
                    />}
                {isBottomsheetVisible && (
                    <BottomSheet
                        ref={sheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        onClose={closeBottomSheet}
                        enablePanDownToClose
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.bottomSheetContainer}>
                            <Filters clearFilters={clearFilters} apply={applyFilters} activeFilters={activeFilters} updateFilters={updateFilters} />
                        </View>
                    </BottomSheet>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
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
        alignItems: "center",
    },
});

export default ListingPage;
