import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
    alpha3Code: string;
    name: string;
}

interface CountriesListProps {
    onSelectCountry: (info: Country) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({ onSelectCountry }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v2/all?fields=alpha3Code,name');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountrySelect = (country: Country) => {
        onSelectCountry(country);
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
