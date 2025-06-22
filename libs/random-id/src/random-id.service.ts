import { Types } from 'mongoose';
import { IdService } from '../../../src/core/app/common/ports/id.service.port';

export class RandomIdService implements IdService {
  generate(): string {
    return new Types.ObjectId().toHexString();
  }
}
