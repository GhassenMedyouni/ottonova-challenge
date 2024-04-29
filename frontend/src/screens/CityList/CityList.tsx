import React, {useEffect, useState} from "react";
import CityCard from "../../components/CityCard/CityCard";
import {City, findAllCities} from "../../services";
import {Subtitle, Title} from "./CityList.data";
import LoadingSpiner from "../../components/LoadingSpiner";

const CityList = () => {

    const [cities, setCities] = useState<City[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 6

    const loadMore = async () => {
        try {
            setLoading(true);
            const response = await findAllCities(page + 1, limit);
            setCities(prevCities => [...prevCities, ...response]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            loadMore();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await findAllCities(page, 6)
                setCities(prevCities => {
                    // Filter out duplicate cities by comparing names
                    const newCities = response.filter((city: City) => !prevCities.some(prevCity => prevCity.name === city.name));
                    return [...prevCities, ...newCities];
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{Title}</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        {Subtitle}
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {cities.map((city, index) => (
                        <CityCard
                            key={`${city.name}_${index}`}
                            name={city.name}
                            country={city.country}
                            founded={city.founded}
                            name_native={city.name_native}
                            continent={city.continent}
                        />
                    ))}
                </div>

                {loading && <LoadingSpiner />}
            </div>
        </div>
    )
}

export default CityList;
