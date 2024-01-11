import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flight{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    airline: string;

    @Column()
    arrivalCity: string;

    @Column()
    deparureCity: string;

    @Column()
    arrivalAirport: string;

    @Column()
    deparureAirport: string;

    @Column()
    availableSeats: number;

    @Column()
    capacity: number;
    
    @Column() 
    departureDate: string;

    @Column() 
    arrivalDate: string;

    @Column() 
    departureTime: string;

    @Column() 
    arrivalTime: string

    @Column()
    price: number;

}