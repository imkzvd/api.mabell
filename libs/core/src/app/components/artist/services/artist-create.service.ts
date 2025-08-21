import { ArtistFactory, ArtistWriteRepository } from '../../../../domain/components/artist';
import { EventBus, IdService } from '../../../ports';
import { ArtistId } from '../../../../domain/components/artist';
import { ArtistCreatedEvent } from '../../../events';
import { prepareArtistEventPayload } from '../utils/prepare-artist-event-payload.utility';

export class ArtistCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _idService: IdService,
  ) {}

  async create(): Promise<ArtistId> {
    const generatedId = this._idService.generate<ArtistId>();
    const nextArtistIndex = await this._WR.getNextIndex();
    const createdArtist = ArtistFactory.create({
      id: generatedId,
      name: `Artist #${nextArtistIndex}`,
    });

    await this._WR.save(createdArtist);

    this._EB.publish(new ArtistCreatedEvent(prepareArtistEventPayload(createdArtist)));

    return createdArtist.getId();
  }
}
