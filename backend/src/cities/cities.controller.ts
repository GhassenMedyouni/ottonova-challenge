import { Controller, Get, Query, Param } from '@nestjs/common';
import {CitiesService} from "./cities.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
    constructor( private readonly citiesService: CitiesService ) {}

    @Get()
    findAll(@Query() query) {
        return this.citiesService.findAll(query);
    }

    @Get(':name')
    findByName(@Param('name') name) {
        return this.citiesService.findByName(name);
    }
}
