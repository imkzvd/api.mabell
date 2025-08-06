import { PlaylistWriteRepository } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistReadRepository } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { PlaylistFactory } from '@core/domain/components/playlist/playlist.factory';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PlaylistCreatedEvent } from '@core/app/common/events/playlist/playlist-created.event';
import { NotFoundException } from '@core/shared/exceptions';
import { CreatePlaylistPayload } from '../types';

export class PlaylistCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _RR: PlaylistReadRepository,
    private readonly _idService: IdService<PlaylistId>,
  ) {}

  async create(payload: CreatePlaylistPayload): Promise<PlaylistId> {
    const generatedId = this._idService.generate();
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

    this._EB.publish(
      new PlaylistCreatedEvent({
        id: foundPlaylist.id,
        name: foundPlaylist.name,
        user: {
          id: foundPlaylist.user.id,
          name: foundPlaylist.user.name,
          isPublic: foundPlaylist.user.isPublic,
        },
        cover: foundPlaylist.cover,
        isPublic: foundPlaylist.isPublic,
      }),
    );

    return generatedId;
  }
}
