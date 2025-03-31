import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '../../../infrastructure/persistence/mongoose/mongoose.module';
import { AdminsModule } from './controllers/admins/admins.module';

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule.forRoot(), MongooseModule, AdminsModule],
})
export class AdminAppModule {}
