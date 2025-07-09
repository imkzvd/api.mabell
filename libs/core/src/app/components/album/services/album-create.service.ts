import { AlbumWriteRepository } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumFactory } from '@core/domain/components/album/album.factory';
import { IdService } from '../../../common/ports/id.service.port';
import { CreateAlbumPayload } from '../types';
import { EventBus } from '../../../common/ports/event-bus.port';
import { AlbumCreatedEvent } from '../../../common/events/album-created.event';

export class AlbumCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
    private readonly _idService: IdService<AlbumId>,
  ) {}

  async create(payload: CreateAlbumPayload): Promise<AlbumId> {
    const generatedId = this._idService.generate();
    const nextAlbumIndex = await this._WR.getNextArtistAlbumIndex(payload.artistId);
    const createdAlbum = AlbumFactory.create({
      id: generatedId,
      name: `Album #${nextAlbumIndex}`,
      artists: [payload.artistId],
    });

    await this._WR.save(createdAlbum);

    this._EB.publish(new AlbumCreatedEvent({ id: generatedId }));

    return generatedId;
  }
}
