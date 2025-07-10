import { PlaylistWriteRepository } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistFactory } from '@core/domain/components/playlist/playlist.factory';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PlaylistCreatedEvent } from '@core/app/common/events/playlist-created.event';
import { CreatePlaylistPayload } from '../types';

export class PlaylistCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _idService: IdService<PlaylistId>,
  ) {}

  async create(payload: CreatePlaylistPayload): Promise<PlaylistId> {
    const generatedId = this._idService.generate();
    const nextPlaylistIndex = await this._WR.getNextPlaylistIndexByOwnerId(payload.ownerId);
    const createdPlaylist = PlaylistFactory.create({
      id: generatedId,
      owner: payload.ownerId,
      name: `Playlist #${nextPlaylistIndex}`,
    });

    await this._WR.save(createdPlaylist);
    this._EB.publish(new PlaylistCreatedEvent({ id: generatedId }));

    return generatedId;
  }
}
