import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ListingPage from "./src/screens/listingPage";
import CountryDetailPage from "./src/screens/detailsPage";
import MyList from "./src/screens/listingPage/MyList";

const Stack = createStackNavigator();

const StackNavigator = () => {

    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="/">
            <Stack.Screen name="/" component={ListingPage} options={{
                title: "Countries"
            }} />
            <Stack.Screen name="Details" component={CountryDetailPage} />
        </Stack.Navigator>
    </NavigationContainer>)
}

export default StackNavigator