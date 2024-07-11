import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const EmptyState = (props: { onPress: () => void }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Oops... We could not find a country that satisfies your search criteria</Text>
            <Button title='Clear Filters' onPress={props.onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        width: 300,
    },
});

export default EmptyState;
