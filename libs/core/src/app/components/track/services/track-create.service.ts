import { TrackWriteRepository } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackFactory } from '@core/domain/components/track/track.factory';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '../../../common/ports/event-bus.port';
import { TrackCreatedEvent } from '../../../common/events/track-created.event';
import { CreateTrackPayload } from '../types';
import { IdService } from '../../../common/ports/id.service.port';

export class TrackCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _idService: IdService<TrackId>,
  ) {}

  async create(payload: CreateTrackPayload): Promise<TrackId> {
    const generatedId = this._idService.generate();
    const nextAlbumTrackIndex = await this._WR.getNextAlbumTrackIndex(payload.albumId);
    const createdTrack = TrackFactory.create({
      id: generatedId,
      name: `Track #${nextAlbumTrackIndex + 1}`,
      artists: payload.artistIds,
      album: payload.albumId,
      trackNumber: nextAlbumTrackIndex,
    });

    await this._WR.save(createdTrack);
    this._EB.publish(new TrackCreatedEvent({ id: generatedId }));

    return createdTrack.getId();
  }
}
