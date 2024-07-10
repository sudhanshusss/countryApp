import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
    return <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', flex: 1 }}>
        <ActivityIndicator size={"large"} />
    </View>
}

export default Loader