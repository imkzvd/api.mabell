import { Types } from 'mongoose';
import { IdService } from '@api.mabell/core';

export class RandomIdService implements IdService {
  generate(): string {
    return new Types.ObjectId().toHexString();
  }
}
