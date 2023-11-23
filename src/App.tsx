import { useState } from 'react';
import './App.css';
import CountriesList from './componets/AxiosContries.tsx';
import DisplayInfo from './componets/DisplayCountriesInformation.tsx';

interface Country {
    alpha3Code: string;
    name: string;
}

function App() {
    const [countryInfo, setCountryInfo] = useState<Country | null>(null);

    const handleCountrySelect = (info: Country) => {
        setCountryInfo(info);
    };

    return (
        <>
            <div className="App">
            <CountriesList onSelectCountry={handleCountrySelect} />
            <DisplayInfo countryInfo={countryInfo} />
            </div>
        </>
    );
}

export default App;
