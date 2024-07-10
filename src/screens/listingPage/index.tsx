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
            const response = await axios.get("https://restcountries.com/v3.1/all");
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
        debouncedFetch(value)
        setActiveFilters({});
        setSearchKeyword(value);
    }, []);

    const debouncedFetch = debounce((name: any) => {
        try {
            setLoading(true)
            axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=false`).then((response) => {
                const countries = response.data
                setFinalCountryList(countries)
            })
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)

        }
    }, 500)
    useEffect(() => {
        if (searchKeyword) {
            return;
        } else {
            const filteredCountries = countryList.filter((country: any) => {
                let truth = true;
                Object.keys(activeFilters).forEach((item) => {
                    truth = truth && country[item] === activeFilters[item];
                });
                return truth;
            });
            setFinalCountryList(filteredCountries);
        }
    }, [activeFilters, searchKeyword, countryList]);

    const renderItem = useCallback(({ item, index }: { item: Country; index: number }) => {
        return <ListingItem {...item} />;
    }, []);

    const snapPoints = useMemo(() => ['90%'], []);

    const clearFilters = useCallback(() => {
        setActiveFilters({});
        setSearchKeyword("");
        closeBottomSheet()
    }, []);

    const closeBottomSheet = useCallback(() => {
        sheetRef?.current?.close();
        setBottomsheetVisible(false)
    }, []);

    const openBottomSheet = useCallback(() => {
        setBottomsheetVisible(true);


    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index !== -1) {
            sheetRef.current.snapToIndex(index);
        }
        else {
            setBottomsheetVisible(false)
        }
    }, []);
    return (

        <View style={styles.container}>
            <SearchBox openFilters={openBottomSheet} keyword={searchKeyword} setSearchKeyword={updateSearchQuery} />
            <Text style={styles.resultsText}>Showing {finalCountryList.length} results</Text>
            {loading ? <Loader /> : finalCountryList?.length === 0 ? <EmptyState onPress={clearFilters} /> :
                <FlashList
                    bounces={true}
                    horizontal={false}
                    estimatedItemSize={122}
                    data={finalCountryList}
                    renderItem={renderItem}
                />}
            {isBottomsheetVisible ? <BottomSheet
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
                    <Filters clearFilters={clearFilters} apply={closeBottomSheet} activeFilters={activeFilters} updateFilters={updateFilters} />
                </View>
            </BottomSheet> : null}
        </View>
    )
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
        paddingBottom: 10
    },
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ListingPage;
