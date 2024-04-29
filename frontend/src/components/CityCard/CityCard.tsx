import React, {useEffect, useState} from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import {fetchImage} from "../../services";
import {countryCode} from "./countryCode.data";

type CityCardProps = {
    name: string;
    name_native: string;
    country: string;
    continent: string;
    founded: string;
}

const CityCard = ({
    name,
    country,
    continent,
    name_native,
    founded
}: CityCardProps)  => {
    const [cityUrl, setCityUrl] = useState('');

    useEffect(() => {
        async function fetchImageUrl() {
            try {
                const cityImage = await fetchImage(name);
                setCityUrl(cityImage);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        }

        fetchImageUrl();
    }, []);

    return (
        <article
            key={name}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
        >
            <img src={cityUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time className="mr-8">
                    Founded: {founded}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="flex gap-x-2.5">
                        <ReactCountryFlag countryCode={countryCode[country]}  style={{ marginTop: 5}} />
                        {country}  - {continent}
                    </div>
                </div>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link to={`/cities/${name}`}>
                    <span className="absolute inset-0" />
                    {name}
                </Link>
            </h3>
        </article>
    )
}

export default CityCard;
