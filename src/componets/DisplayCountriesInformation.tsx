import React from 'react';

interface CountryInfo {
    name: string;
    capital: string;
    population: number;
    borders: string[];
    flag: {
        svg: string;
        png: string;
    };
}

interface DisplayInfoProps {
    countryInfo: CountryInfo | null;
}

const DisplayInfo: React.FC<DisplayInfoProps> = ({ countryInfo }) => {
    return (
        <div className="CountryInfo">
            {countryInfo ? (
                <>
                    <h2>{countryInfo.name}</h2>
                    <p>Столица: {countryInfo.capital}</p>
                    <p>Население: {countryInfo.population}</p>
                    <p>Граничит с: {countryInfo.borders ? countryInfo.borders.join(', ') : 'Нет данных о границах'}</p>
                    <img src={countryInfo.flag} alt={`${countryInfo.name} флаг`} />
                </>
            ) : (
                <p>Выберите страну</p>
            )}
        </div>
    );
};

export default DisplayInfo;
