export interface Country {
    altSpellings: string[];
    area: number;
    capital: string[];
    capitalInfo: {
        latlng: number[];
    };
    car: {
        side: string;
        signs: string[];
    };
    cca2: string;
    cca3: string;
    ccn3: string;
    coatOfArms: {
        png?: string;

    };
    continents: string[];
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    demonyms: {
        eng: {
            f: string;
            m: string;
        };
    };
    flag: string;
    flags: {
        png: string;
        svg: string;
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    independent: boolean;
    landlocked: boolean;
    languages: {
        [key: string]: string;
    };
    latlng: number[];
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    name: {
        common: string;
        nativeName: {
            [key: string]: object;
        };
        official: string;
    };
    population: number;
    postalCode: {
        format: string;
        regex: string;
    };
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: {
        [key: string]: {
            common: string;
            official: string;
        };
    };
    unMember: boolean;
}

export interface FilterItem {
    text: string,
    value: string,
    key: string
}
export interface FiltersProps {
    activeFilters: { [key: string]: string | boolean },
    updateFilters: (filter: FilterItem) => void
    apply: () => void;
    clearFilters: () => void
}