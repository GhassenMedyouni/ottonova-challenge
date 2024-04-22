import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import {CitiesService} from "./cities.service";
import {City} from "./city.interface";

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all cities', () => {
    const query = { page: 1, limit: 10, name: '' };
    const cities: City[] = [{
      name: 'City1',
      name_native: 'City1 native',
      country: 'Country1',
      continent: 'Continent1',
      latitude: 'latitude1',
      longitude: 'longitude1',
      founded: 'founded1',
      landmarks: ['landmark1', 'landmark2']
    }, {
      name: 'City2',
      name_native: 'City2 native',
      country: 'Country2',
      continent: 'Continent2',
      latitude: 'latitude2',
      longitude: 'longitude2',
      founded: 'founded2',
      landmarks: ['landmark3', 'landmark4']
    }];
    jest.spyOn(service, 'findAll').mockReturnValue(cities);

    expect(controller.findAll(query)).toEqual(cities);
  });

  it('should find city by name', () => {
    const cityName = 'Lagos';
    const city: City = {
      name: cityName,
      name_native: 'Lagos native',
      country: 'Nigeria',
      continent: 'Africa',
      latitude: '6.5244',
      longitude: '3.3792',
      founded: 'some date',
      landmarks: ['landmark1', 'landmark2']
    };
    jest.spyOn(service, 'findByName').mockReturnValue(city);

    expect(controller.findByName(cityName)).toEqual(city);
  });


});
