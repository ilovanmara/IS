import { IsNotEmpty, IsNumber, IsOptional } from "@nestjs/class-validator";

export class CreateReservationDto{
    @IsNotEmpty()
    flightId: number;

    @IsOptional()
    @IsNumber()
    returnFlightId?: number;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    numberOfPersons: number;
}