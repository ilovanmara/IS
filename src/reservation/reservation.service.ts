import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/DTO/create-reservation.dto';
import { Reservation } from 'src/Entity/Reservation';
import { Repository } from 'typeorm/repository/Repository';
import { FlightsService } from 'src/flights/flights.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ReservationService {

    constructor(@InjectRepository(Reservation) private repo: Repository<Reservation>,
    private readonly flightsService: FlightsService, private readonly authService: AuthService
    ){}

    async getAllReservationByUserId(userId: number){
        try{
            return await this.repo.find({ 
              where: {
                userId: userId
               },
           });
          }catch (err){
            throw new InternalServerErrorException('Something went wrong');
          }
    }

    async createReservation(createReservationDto: CreateReservationDto){
        const{flightId, returnFlightId, userId, numberOfPersons} = createReservationDto;
        const newReservation = new Reservation();
        newReservation.flightId = flightId;
        newReservation.returnFlightId = returnFlightId;
        newReservation.userId = userId;
        newReservation.numberOfPersons = numberOfPersons;
        console.log(returnFlightId)

        const userMoney = await this.authService.getMoneyById(userId);
        const flight = await this.flightsService.getFlightById(flightId);
        let returnFlight: any; 
        let totalCost = 0;
        if (returnFlightId) {
            returnFlight = await this.flightsService.getFlightById(returnFlightId);
            totalCost = numberOfPersons * flight.price + numberOfPersons * returnFlight.price;
        } else {
            totalCost = numberOfPersons * flight.price;
        }
        if (userMoney >= totalCost){
            if(returnFlight){
                if(flight.availableSeats >= numberOfPersons && returnFlight.availableSeats >= numberOfPersons){
                    for(let i = 0; i < numberOfPersons; i++){
                        this.flightsService.updateFlightAvailability(flightId);
                        this.flightsService.updateFlightAvailability(returnFlightId);
                        
                    }
                    this.repo.create(newReservation);
                    await this.authService.subMoneyById(userId, totalCost);
                    return await this.repo.save(newReservation);
                 }else {
                    throw new Error('Not enough available seats for the reservation');
                }
            } else {
                if(flight.availableSeats >= numberOfPersons ){
                    for(let i = 0; i < numberOfPersons; i++){
                        this.flightsService.updateFlightAvailability(flightId); 
                    }
                    this.repo.create(newReservation);
                    await this.authService.subMoneyById(userId, totalCost);
                    return await this.repo.save(newReservation);
                 }else {
                    throw new Error('Not enough available seats for the reservation');
                }
            }
 
        }else {
            throw new Error('Not enough money in the user\'s account');
        }
    }

    async cancelReservation(id: number){
        const reservation = await this.repo.findOne({ where: { id: id } })

        const flight = await this.flightsService.getFlightById(reservation.flightId);
        let returnFlight: any;
        if (reservation.returnFlightId) {
             returnFlight = await this.flightsService.getFlightById(reservation.returnFlightId);
        }

        let totalCost = 0;
        if (returnFlight) {
            totalCost = reservation.numberOfPersons * flight.price + reservation.numberOfPersons * returnFlight.price;
        } else {
            totalCost = reservation.numberOfPersons * flight.price;
        }

        for (let i = 0; i < reservation.numberOfPersons; i++) {
            this.flightsService.updateFlightAvailabilityCancel(reservation.flightId);
            if (reservation.returnFlightId) {
                this.flightsService.updateFlightAvailabilityCancel(reservation.returnFlightId);
            }
        }
        await this.authService.addMoneyById(reservation.userId, totalCost);

        return await this.repo.delete({id});
    }

}


