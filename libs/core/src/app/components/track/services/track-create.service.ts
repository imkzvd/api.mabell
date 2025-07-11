import { TrackWriteRepository } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackFactory } from '@core/domain/components/track/track.factory';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { TrackCreatedEvent } from '@core/app/common/events/track/track-created.event';
import { NotFoundException } from '@core/shared/exceptions';
import { CreateTrackPayload } from '../types';

export class TrackCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _RR: TrackReadRepository,
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

    const foundTrack = await this._RR.findById(createdTrack.getId());

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(
      new TrackCreatedEvent({
        id: foundTrack.id,
        name: foundTrack.name,
        album: { id: foundTrack.album.id, name: foundTrack.album.name },
        artists: foundTrack.artists.map(({ id, name }) => ({ id, name })),
        featArtists: foundTrack.featArtists.map(({ id, name }) => ({ id, name })),
        cover: foundTrack.album.cover,
        isExplicit: foundTrack.isExplicit,
      }),
    );

    return createdTrack.getId();
  }
}
