import { CreatePlaylistPayload } from '../types';
import { PlaylistFactory, PlaylistWriteRepository } from '../../../../domain/components/playlist';
import { NotFoundException } from '../../../../shared/exceptions';
import { EventBus, IdService, PlaylistReadRepository } from '../../../ports';
import { PlaylistId } from '../../../../domain/components/playlist/types';
import { PlaylistCreatedEvent } from '../../../events';
import { preparePlaylistEventPayload } from '../utils/prepare-playlist-event-payload.utility';
export class PlaylistCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _RR: PlaylistReadRepository,
    private readonly _idService: IdService,
  ) {}

  async create(payload: CreatePlaylistPayload): Promise<PlaylistId> {
    const generatedId = this._idService.generate<PlaylistId>();
    const nextPlaylistIndex = await this._WR.getNextPlaylistIndexByUserId(payload.userId);
    const createdPlaylist = PlaylistFactory.create({
      id: generatedId,
      user: payload.userId,
      name: `Playlist #${nextPlaylistIndex}`,
    });

    await this._WR.save(createdPlaylist);

    const foundPlaylist = await this._RR.findById(createdPlaylist.getId());

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(new PlaylistCreatedEvent(preparePlaylistEventPayload(foundPlaylist)));

    return generatedId;
  }
}
