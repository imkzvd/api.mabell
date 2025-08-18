import { CreateTrackPayload } from '../types';
import { TrackFactory, TrackWriteRepository } from '../../../../domain/components/track';
import { NotFoundException } from '../../../../shared/exceptions';
import { EventBus, IdService, TrackReadRepository } from '../../../ports';
import { TrackId } from '../../../../domain/components/track/types';
import { TrackCreatedEvent } from '../../../events';
import { prepareTrackEventPayload } from '../utils/prepare-track-event-payload.utility';

export class TrackCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _RR: TrackReadRepository,
    private readonly _idService: IdService,
  ) {}

  async create(payload: CreateTrackPayload): Promise<TrackId> {
    const generatedId = this._idService.generate<TrackId>();
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

    this._EB.publish(new TrackCreatedEvent(prepareTrackEventPayload(foundTrack)));

    return createdTrack.getId();
  }
}
