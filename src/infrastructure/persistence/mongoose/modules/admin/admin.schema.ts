import { SchemaFactory } from '@nestjs/mongoose';
import { Admin } from './admin.document';

export const AdminSchema = SchemaFactory.createForClass(Admin);
