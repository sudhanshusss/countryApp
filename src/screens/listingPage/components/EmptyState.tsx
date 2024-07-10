import React from 'react'
import { Button, Text, View } from 'react-native'

const EmptyState = (props: { onPress: () => void }) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 20, textAlign: 'center', color: 'black', fontSize: 20, width: 300 }}>Oops... We could not find country that satisfies your search criteria </Text>
        <Button title='Clear Filters' onPress={props.onPress} />
    </View>
}
export default EmptyState