import { Injectable } from '@nestjs/common';
import { City } from "./city.interface";
import { join } from "path";
import { readFileSync } from "fs";

@Injectable()
export class CitiesService {
    private readonly cities: City[];

    constructor() {
        this.cities = this.loadCities();
    }

    private loadCities() : City[] {
        const filePath = join(__dirname, "../data/cities.json");
        const jsonData = readFileSync(filePath, "utf8");
        return JSON.parse(jsonData).cities;
    }

    findAll(query) : City[] {
        const { page = 1, limit = 3, name = "" } = query;

        const filteredCities = this.cities.filter(city => city.name.toLowerCase().includes(name.toLowerCase()));

        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, filteredCities.length);


        return filteredCities.slice(startIndex, endIndex);
    }

    findByName(name: string) : City | undefined {
        return this.cities.find(city => city.name.toLowerCase() === name.toLowerCase());
    }

}
