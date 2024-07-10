export const paginate = (data: any, skip: number, limit: number) => {
    return data.slice(skip, limit)
}
export const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export const debounce = (callback: Function, delay: number) => {
    let timerId: any;
    return function (...args: any) {
        clearTimeout(timerId);
        timerId = setTimeout(async () => {
            await callback.apply(this, args);
        }, delay);
    };
}


