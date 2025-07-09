import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistFactory } from '@core/domain/components/artist/artist.factory';
import { ArtistId } from '@core/domain/components/artist/types';
import { IdService } from '../../../common/ports/id.service.port';
import { EventBus } from '../../../common/ports/event-bus.port';
import { ArtistCreatedEvent } from '../../../common/events/artist-created.event';

export class ArtistCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _idService: IdService<ArtistId>,
  ) {}

  async create(): Promise<ArtistId> {
    const generatedId = this._idService.generate();
    const nextArtistIndex = await this._WR.getNextIndex();
    const createdArtist = ArtistFactory.create({
      id: generatedId,
      name: `Artist #${nextArtistIndex}`,
    });

    await this._WR.save(createdArtist);
    this._EB.publish(new ArtistCreatedEvent({ id: generatedId }));

    return generatedId;
  }
}
