import { IdService } from '../../../core/app/common/ports/id.service.port';
import { Types } from 'mongoose';

export class IdService implements IdService {
  generate(): string {
    return new Types.ObjectId().toHexString();
  }
}
