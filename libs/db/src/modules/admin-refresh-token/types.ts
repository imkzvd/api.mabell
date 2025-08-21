import { HydratedDocument } from 'mongoose';
import { AdminRefreshToken } from './admin-refresh-token.schema';

export type AdminRefreshTokenDocument = HydratedDocument<AdminRefreshToken>;
