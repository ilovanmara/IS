import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { CreateReservationDto } from 'src/DTO/create-reservation.dto';

@Controller('reservation')
export class ReservationController {
    
    constructor(private reservationService: ReservationService){

    }

    @Post()
    createReservation(@Body(ValidationPipe) newReservationDatata: CreateReservationDto){
        return this.reservationService.createReservation(newReservationDatata);
        
    }

    @Delete(':id')
    cancelReservation(@Param('id') id: number){
        return this.reservationService.cancelReservation(id);
    }

    @Get('userId/:userId')
    getAllReservationsByUserId(@Param('userId') userId: number){
        return this.reservationService.getAllReservationByUserId(userId);

    }
}
