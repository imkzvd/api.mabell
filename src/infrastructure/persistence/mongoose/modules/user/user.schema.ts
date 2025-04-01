import { SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.document';

export const UserSchema = SchemaFactory.createForClass(User);
