import { HydratedDocument } from 'mongoose';
import { RefreshToken } from './refresh-token.schema';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;
