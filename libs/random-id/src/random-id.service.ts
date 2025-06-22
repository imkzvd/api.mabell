import { Types } from 'mongoose';
import { IdService as IdServicePort } from '../../../core/app/common/ports/id.service.port';

export class IdService implements IdServicePort {
  generate(): string {
    return new Types.ObjectId().toHexString();
  }
}
