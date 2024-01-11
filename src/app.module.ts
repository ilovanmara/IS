import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Flight } from './Entity/Flight';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ReservationModule } from './reservation/reservation.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Vocearomania1!',
  database: 'citybreaks',
  autoLoadEntities: true,
  synchronize: true,
}

@Module({
  imports: [
    FlightsModule,
    TypeOrmModule.forRoot(ormOptions),
    AuthModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
