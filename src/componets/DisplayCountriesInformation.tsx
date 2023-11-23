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
                    <p>Граничит с: </p>
                    <ul>
                        {countryInfo.borders ? countryInfo.borders.map((border, index) => (
                            <li key={index}>{border}</li>
                        )) : <li>Нет данных о границах</li>}
                    </ul>
                    {countryInfo.flag && countryInfo.flag.svg ? (
                        <img src={countryInfo.flag.svg} alt={`${countryInfo.name} флаг`} />
                    ) : (
                        <p>Нет изображения флага</p>
                    )}
                </>
            ) : (
                <p>Выберите страну</p>
            )}
        </div>
    );
};

export default DisplayInfo;
