import { TrackWriteRepository } from '../../../../domain/components/track';
import { TrackId } from '../../../../domain/components/track/types';

export class TrackVerifyService {
  constructor(private readonly _WR: TrackWriteRepository) {}

  async verify(id: string): Promise<TrackId | null> {
    return this._WR.existsById(id);
  }
}
