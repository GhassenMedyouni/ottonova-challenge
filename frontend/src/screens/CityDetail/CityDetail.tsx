import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from 'react-router-dom';
import {City, fetchImage, findCityByName} from "../../services";
import {countryCode} from "../../components/CityCard/countryCode.data";
import ReactCountryFlag from "react-country-flag";
import LoadingSpinner from "../../components/LoadingSpiner";
import CityMap from "../../components/CityMap";

const CityDetail = () => {

    const { cityName } = useParams<{ cityName: string }>();
    const navigate = useNavigate();

    const [city, setCity] = useState<City>();
    const [loading, setLoading] = useState(false);
    const [landmarkUrls, setLandmarkUrls] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        async function fetchCity() {
            try {
                setLoading(true);
                if (!cityName) {
                    navigate("/");
                    return console.error('city name not found !');
                }
                const cityData = await findCityByName(cityName);
                if (cityData) {
                    setCity(cityData);
                    fetchLandmarkImages(cityData.landmarks);
                };
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCity();
    }, []);


    const fetchLandmarkImages = async (landmarks: string[]) => {
        const urls: { [key: string]: string } = {};
        for (const landmark of landmarks) {
            const url = await fetchImage(landmark);
            urls[landmark] = url;
        }
        setLandmarkUrls(urls);
    };



    return (
        <>
            { city && !loading ? (
                <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                    <div className="flex-1 xl:flex">
                        <div className="flex-1 px-4 py-6 sm:px-6 lg:pl-8 xl:pl-6">

                            <div className="flex justify-between">
                                <div className="sm:flex sm:items-center ">
                                    <div className="mb-4 border flex-shrink-0 sm:mb-0 sm:mr-4">
                                        <ReactCountryFlag
                                            style={{ height: 100, width: 120}}
                                            countryCode={countryCode[city.country]} svg />
                                    </div>
                                    <div style={{ alignSelf: "center"}}>
                                        <h4 className="text-lg font-bold">{city.country}</h4>
                                    </div>
                                </div>

                                <div style={{ alignSelf: "center", margin: "auto"}}
                                     className="sm:flex sm:items-center ">
                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                            {city.name}
                                        </h1>
                                        {city.name === city.name_native && (
                                            <div style={{ textAlign: "center" }}>
                                                <h4>{city.name_native}</h4>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>


                            <dl className="mt-16 grid grid-cols-1 gap-2 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex flex-col bg-gray-300 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">Continent</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{city.continent}</dd>
                                </div>

                                <div className="flex flex-col bg-gray-300 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">Population</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                                        {parseFloat(city.population) / 1000000} Million
                                    </dd>
                                </div>
                                <div className="flex flex-col bg-gray-300 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">Founded</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{city.founded}</dd>
                                </div>
                            </dl>

                            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
                                {city.landmarks.map((landmark) => (
                                    <div key={landmark} className="group relative">
                                        <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                                            <img
                                                src={landmarkUrls[landmark]}
                                                alt={landmark}
                                                className="h-80 w-full object-cover"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-base font-semibold text-gray-900">
                                            <a href="#">
                                                <span className="absolute inset-0" />
                                                {landmark}
                                            </a>
                                        </h3>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>

                    <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
                        {/* Right column area */}
                        <div className="h-full w-full rounded-lg overflow-hidden">
                            <CityMap
                                latitude={parseFloat(city.latitude)}
                                longitude={parseFloat(city.longitude)}
                            />
                        </div>

                    </div>
                </div>
            ) : (
                <div>
                    <LoadingSpinner />
                </div>
            )}
        </>
    )
}

export default CityDetail;
