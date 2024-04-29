import axios from 'axios';

export interface City {
    name: string;
    name_native: string;
    country: string;
    continent: string;
    latitude: string;
    longitude: string;
    founded: string;
    population: string;
    landmarks: string[];
}

const { REACT_APP_URL, REACT_APP_UNSPLASH_API_KEY } = process.env;

export async function findAllCities(page: number, limit: number){
    try {

        const response = await fetch(`${REACT_APP_URL}/cities?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

export async function findCityByName(name: string): Promise<City | null> {
    try {
        const response = await fetch(`${REACT_APP_URL}/cities/${name}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null; // City not found
            }
            throw new Error('Failed to fetch city by name');
        }
        const city = await response.json();
        return city;
    } catch (error) {
        console.error('Error fetching city by name:', error);
        throw error;
    }
}

export const fetchImage = async (cityName: string) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: cityName,
                client_id: `${REACT_APP_UNSPLASH_API_KEY}`,
            },
        });
        return response.data.results[0]?.urls.regular;
    } catch (error) {
        console.error("Error fetching image from unsplash: ", error);
    }

};
