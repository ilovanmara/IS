import {IsDate, IsNotEmpty} from "@nestjs/class-validator"

export class CreateFlightDto {
    @IsNotEmpty()
    airline: string;

    @IsNotEmpty()
    arrivalCity: string;

    @IsNotEmpty()
    deparureCity: string;

    @IsNotEmpty()
    arrivalAirport: string;

    @IsNotEmpty()
    deparureAirport: string;

    @IsNotEmpty()
    availableSeats: number;

    @IsNotEmpty()
    capacity: number;

    @IsNotEmpty()
    departureDate: string;

    @IsNotEmpty()
    arrivalDate: string;

    @IsNotEmpty()
    departureTime: string;

    @IsNotEmpty()
    arrivalTime: string;

    @IsNotEmpty()
    price: number;
}