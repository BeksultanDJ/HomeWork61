import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
    alpha3Code: string;
    name: string;
}

const CountriesList: React.FC = () => {
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

    return (
        <div>
            <h1>Список стран</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.alpha3Code}>{country.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CountriesList;
