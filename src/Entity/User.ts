import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    salt: string

    @Column({ nullable: true })
    money: number;
}

