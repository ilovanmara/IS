import { Get, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFlightDto } from 'src/DTO/create-flight.dto';
import { Flight } from 'src/Entity/Flight';
import {  Repository } from 'typeorm';

@Injectable()
export class FlightsService {

    constructor(@InjectRepository(Flight) private repo: Repository<Flight>){
     // console.log('Flight Repository:', this.repo);
    }
    
    @Get()
    async getAllFlights(){
        return await this.repo.find();
    }
    //airline: string, arrivalCity: string, deparureCity: string, arrivalAirport: string, departureAirport: string, avilableSeats: number, capacity: number, departureDateTime: Date, arrivalDateTime: Date, price: numbe
    async createFlight(createFlightDto: CreateFlightDto){
        const {airline, arrivalCity, deparureCity, arrivalAirport, deparureAirport, availableSeats, capacity, departureDate, arrivalDate, departureTime, arrivalTime, price} = createFlightDto;
        const newFlight = new Flight();
        newFlight.airline = airline;
        newFlight.arrivalCity = arrivalCity;
        newFlight.deparureCity = deparureCity;
        newFlight.arrivalAirport = arrivalAirport;
        newFlight.deparureAirport = deparureAirport;
        newFlight.availableSeats = availableSeats;
        newFlight.capacity = capacity;
        newFlight.price = price;
        newFlight.departureDate = departureDate;
        newFlight.arrivalDate = arrivalDate;
        newFlight.departureTime = departureTime;
        newFlight.arrivalTime = arrivalTime;

        this.repo.create(newFlight);
        return await this.repo.save(newFlight);
      }

      async getFlightById(flightId: number) {
        return await this.repo.findOne({ where: { id: flightId } });
      }

      async getFlightsByCitiesandDate(departureCity: string, arrivalCity: string, departureDate: string){
        try{
          return await this.repo.find({ 
            where: {
              deparureCity: departureCity,
              arrivalCity: arrivalCity,
              departureDate: departureDate
             },
         });
        }catch (err){
          throw new InternalServerErrorException('Something went wrong');
        }
      }

      async updateFlightAvailability(flightId: number) {
        const flight = await this.getFlightById(flightId);
    
        if (!flight) {
          throw new NotFoundException(`Flight with id ${flightId} not found`);
        }
    
        if (flight.availableSeats > 0) {
          flight.availableSeats -= 1;
          return await this.repo.save(flight);
        } else {
          //throw new Error('No available seats for this flight');
          this.delete(flightId);
        }
      }

      async updateFlightAvailabilityCancel(flightId: number) {
        const flight = await this.getFlightById(flightId);
    
        if (!flight) {
          throw new NotFoundException(`Flight with id ${flightId} not found`);
        }
    
        if (flight.availableSeats > 0) {
          flight.availableSeats += 1;
          return await this.repo.save(flight);
        } else {
          //throw new Error('No available seats for this flight');
          this.delete(flightId);
        }
      }

      async delete(id: number){
        try{
            return await this.repo.delete({id});
        } catch (err) {
            throw new InternalServerErrorException('Something went wrong');
        }
      }

      async getAllUniqueArrivalCities(){
        try {
          const uniqueArrivalCities = await this.repo
            .createQueryBuilder('flight')
            .select('DISTINCT flight.arrivalCity', 'arrivalCity')
            .getRawMany();
            //console.log('Unique Arrival Cities:', uniqueArrivalCities);
          return uniqueArrivalCities.map(city => city.arrivalCity);
        } catch (err) {
          throw new InternalServerErrorException('Something went wrong');
        }
      }

      async getAllUniqueDepartureCities(){
        try {
          const uniqueArrivalCities = await this.repo
            .createQueryBuilder('flight')
            .select('DISTINCT flight.deparureCity', 'deparureCity')
            .getRawMany();
    
          return uniqueArrivalCities.map(city => city.deparureCity);
        } catch (err) {
          throw new InternalServerErrorException('Something went wrong');
        }
      }
      

}
