import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FilterIcon } from "../../../../assets/svg";
import { isIos } from "../utils";

const SearchBox = (props: { keyword: string; setSearchKeyword: (value: string) => void; openFilters: () => void }) => {
    const { setSearchKeyword, keyword, openFilters } = props;
    const onChangeText = (text: string) => {
        setSearchKeyword(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={{ paddingVertical: 10 }} onChangeText={onChangeText} value={keyword} placeholder="Enter country name here" />
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={openFilters}>
                <FilterIcon width={20} height={20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputContainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBox;
