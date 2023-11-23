import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
    alpha3Code: string;
    name: string;
    borders: string[];
}

interface BorderCountry extends Country {}

interface CountriesListProps {
    onSelectCountry: (info: Country) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({ onSelectCountry }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get<Country[]>('https://restcountries.com/v2/all?fields=alpha3Code,name,capital,population,borders');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const fetchBorderCountryNames = async (borderCodes: string[]) => {
        try {
            const borderCountriesData = await Promise.all(
                borderCodes.map(async (borderCode) => {
                    const response = await axios.get<BorderCountry>(`https://restcountries.com/v2/alpha/${borderCode}`);
                    return response.data.name;
                })
            );
            return borderCountriesData;
        } catch (error) {
            console.error('Error fetching border countries:', error);
            return [];
        }
    };

    const handleCountrySelect = async (country: Country) => {
        setSelectedCountry(country);

        if (country.borders && country.borders.length > 0) {
            const borderCountryNames = await fetchBorderCountryNames(country.borders);
            const updatedCountry = { ...country, borders: borderCountryNames };
            onSelectCountry(updatedCountry);
        } else {
            onSelectCountry(country);
        }
    };

    return (
        <div className="CountryList">
            <ul>
                {countries.map((country) => (
                    <li key={country.alpha3Code} onClick={() => handleCountrySelect(country)}>
                        {country.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountriesList;
