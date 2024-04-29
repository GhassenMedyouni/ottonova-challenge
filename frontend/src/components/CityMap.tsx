import React from "react";
import ReactMapGL from 'react-map-gl';


interface mapProps {
    latitude: number;
    longitude: number;
}

const { REACT_APP_MAPBOX_TOKEN } =  process.env;

const CityMap: React.FC<mapProps> = ({ longitude, latitude }) => {

    return (
        <ReactMapGL
            mapLib={import('mapbox-gl')}
            initialViewState={{
                latitude: latitude,
                longitude: longitude,
                zoom: 10,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
    );
};

export default CityMap;
