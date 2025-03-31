import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '../../../infrastructure/persistence/mongoose/mongoose.module';

@Module({
  imports: [CqrsModule.forRoot(), MongooseModule],
})
export class AdminAppModule {}
