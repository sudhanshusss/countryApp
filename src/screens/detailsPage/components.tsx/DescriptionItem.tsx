import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

interface DescriptionItemProps {
    title: string;
    value?: string;
    isValueClickable?: boolean;
    onClick?: () => void;
    image?: string;
    type?: "Image" | "text";
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({
    title,
    value,
    isValueClickable,
    onClick,
    image,
    type = "text",
}) => {
    return (
        <TouchableOpacity
            activeOpacity={isValueClickable ? 0.7 : 1}
            onPress={onClick}
            style={styles.container}
        >
            <Text style={styles.title}>{title}</Text>
            <View style={styles.valueContainer}>
                {type === 'text' ? (
                    <Text style={styles.valueText}>{value}</Text>
                ) : (
                    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        paddingBottom: 8,
        paddingHorizontal: 16, // Add padding for better touch area
    },
    title: {
        color: "black",
        fontFamily: "Duru Sans",
        fontSize: 16,
        marginTop: 6,
        width: 200,
        fontWeight: 'bold',
    },
    valueContainer: {
        flex: 1,
        alignItems: 'flex-end', // Align value to the end of container
    },
    valueText: {
        color: "black",
        fontFamily: "Duru Sans",
        fontSize: 16,
        marginTop: 6,
        width: 150,
        fontWeight: 'normal',
    },
    image: {
        width: 24,
        height: 24,
        borderRadius: 12, // Apply border radius for circular images
    },
});

export default DescriptionItem;
