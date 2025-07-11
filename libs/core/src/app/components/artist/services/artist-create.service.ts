import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistFactory } from '@core/domain/components/artist/artist.factory';
import { ArtistId } from '@core/domain/components/artist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { ArtistCreatedEvent } from '@core/app/common/events/artist/artist-created.event';

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
    this._EB.publish(
      new ArtistCreatedEvent({
        id: generatedId,
        name: createdArtist.getName().value,
        avatar: createdArtist.getAvatar(),
      }),
    );

    return generatedId;
  }
}
