import { HydratedDocument } from 'mongoose';
import { UserRefreshToken } from './user-refresh-token.schema';

export type UserRefreshTokenDocument = HydratedDocument<UserRefreshToken>;
