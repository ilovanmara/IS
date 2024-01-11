import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from 'src/DTO/create-flight.dto';

@Controller('flights')
export class FlightsController {

    constructor(private flightsService: FlightsService) {    
    }

    @Get()
    getAllFlights(){
        return this.flightsService.getAllFlights();
    }

    @Get('cities-and-date')
    getFlightsByCitiesAndDate(
        @Query('deparureCity') deparureCity: string,
        @Query('arrivalCity') arrivalCity: string,
        @Query('departureDate') departureDate: string,
    ) {
        return this.flightsService.getFlightsByCitiesandDate(
            deparureCity,
            arrivalCity,
            departureDate
        );
    }

    @Post()
    createFlight(@Body(ValidationPipe) newFlightData: CreateFlightDto){
        //const {airline, arrivalCity, deparureCity, arrivalAirport, departureAirport, availableSeats, capacity, departureDateTime, arrivalDateTime, price} = newFlightData;
        //return this.flightsService.createFlight(airline, arrivalCity, deparureCity, arrivalAirport, departureAirport, availableSeats, capacity, departureDateTime, arrivalDateTime, price);
        return this.flightsService.createFlight(newFlightData);
    }

    @Patch(':id')
    updateFlight(@Param('id') flightId: number){
        return this.flightsService.updateFlightAvailability(flightId);      
    }

    @Get('/unique-arrival-cities')
    getAllUniqueArrivalCities(){
        return this.flightsService.getAllUniqueArrivalCities();
    }

    @Get('/unique-departure-cities')
    getAllUniqueDepartureCities(){
        return this.flightsService.getAllUniqueDepartureCities();
    }

    @Get(':id')
    getFlightByID(@Param('id') flightId: number){
        return this.flightsService.getFlightById(flightId);
    }

    @Delete(':id')
    deleteFlight(@Param('id') id: number){
        return this.flightsService.delete(id);
    }




}
