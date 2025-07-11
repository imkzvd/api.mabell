import { TrackWriteRepository } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackId } from '@core/domain/components/track/types';

export class TrackVerifyService {
  constructor(private readonly _WR: TrackWriteRepository) {}

  async verify(id: string): Promise<TrackId | null> {
    return this._WR.existsById(id);
  }
}
