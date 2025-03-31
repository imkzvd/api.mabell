import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '../../../infrastructure/persistence/mongoose/mongoose.module';
import { AdminsModule } from './controllers/admins/admins.module';

@Module({
  imports: [CqrsModule.forRoot(), MongooseModule, AdminsModule],
})
export class AdminAppModule {}
