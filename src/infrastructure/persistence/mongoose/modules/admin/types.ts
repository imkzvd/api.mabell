import { HydratedDocument } from 'mongoose';
import { Admin } from './admin.schema';

export type AdminDocument = HydratedDocument<Admin>;
