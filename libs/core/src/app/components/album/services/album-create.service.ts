import { CreateAlbumPayload } from '../types';
import { AlbumFactory, AlbumWriteRepository } from '../../../../domain/components/album';
import { NotFoundException } from '../../../../shared/exceptions';
import { AlbumReadRepository, EventBus, IdService } from '../../../ports';
import { AlbumId } from '../../../../domain/components/album/types';
import { AlbumCreatedEvent } from '../../../events';
import { prepareAlbumEventPayload } from '../utils/prepare-album-event-payload.utility';

export class AlbumCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
    private readonly _RR: AlbumReadRepository,
    private readonly _idService: IdService,
  ) {}

  async create(payload: CreateAlbumPayload): Promise<AlbumId> {
    const generatedId = this._idService.generate<AlbumId>();
    const nextAlbumIndex = await this._WR.getNextAlbumIndexByArtistId(payload.artistId);
    const createdAlbum = AlbumFactory.create({
      id: generatedId,
      name: `Album #${nextAlbumIndex}`,
      artists: [payload.artistId],
    });

    await this._WR.save(createdAlbum);

    const foundAlbum = await this._RR.findById(createdAlbum.getId());

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(new AlbumCreatedEvent(prepareAlbumEventPayload(foundAlbum)));

    return foundAlbum.id;
  }
}
