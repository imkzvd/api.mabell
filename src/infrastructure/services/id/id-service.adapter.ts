import { IdService } from '../../../core/app/common/services/id-service.port';
import { Types } from 'mongoose';

export class IdServiceAdapter implements IdService {
  generate(): string {
    return new Types.ObjectId().toHexString();
  }
}
