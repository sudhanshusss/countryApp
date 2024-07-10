import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { FilterIcon } from "../../../../assets/svg";

const SearchBox = (props: { keyword: string, setSearchKeyword: (value: string) => void, openFilters: () => void }) => {
    const { setSearchKeyword, keyword, openFilters } = props
    const [value, setValue] = useState(keyword)
    const onChangeText = (text: string) => {
        setSearchKeyword(text)
        // setValue(text)
    }
    return (
        <View style={{ width: "100%", height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '80%', borderWidth: 1, borderColor: "black", borderRadius: 8, paddingHorizontal: 16 }}>
                <TextInput onChangeText={onChangeText} value={keyword} placeholder="Enter country name here" />
            </View>
            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 40, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }} onPress={openFilters}>
                <FilterIcon width={20} height={20} />
            </TouchableOpacity>
        </View>
    )
}
export default SearchBox