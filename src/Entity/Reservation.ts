import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    flightId: number;

    @Column({ nullable: true })
    returnFlightId: number;

    @Column()
    numberOfPersons: number;
}


