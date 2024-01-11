import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/Entity/Reservation';
import { FlightsModule } from 'src/flights/flights.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]),
  FlightsModule, AuthModule
],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
