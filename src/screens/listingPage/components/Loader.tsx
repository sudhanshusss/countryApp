import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
});

export default Loader;
