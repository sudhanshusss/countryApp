import { Platform } from "react-native";

export const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isIos = () => {
    return Platform.OS === "ios"
}
export const debounce = <T extends any[]>(callback: (...args: T) => Promise<void>, delay: number) => {
    let timerId: NodeJS.Timeout;

    return function (this: any, ...args: T) {
        clearTimeout(timerId);

        timerId = setTimeout(async () => {
            await callback.apply(this, args);
        }, delay);
    };
};


