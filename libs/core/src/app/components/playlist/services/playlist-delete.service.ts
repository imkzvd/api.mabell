import { NotFoundException } from '@core/shared/exceptions';
import { PlaylistWriteRepository } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { UserFileStorage } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { PlaylistDeletedEvent } from '@core/app/common/events/playlist/playlist-deleted.event';
import { PlaylistsDeletedEvent } from '@core/app/common/events/playlist/playlists-deleted.event';

export class PlaylistDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _FS: UserFileStorage,
  ) {}

  async delete(id: string): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    await this._WR.deleteById(id);
    await this._FS.deletePlaylistDirectory(foundPlaylist.getUser(), foundPlaylist.getId());
    this._EB.publish(new PlaylistDeletedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async deleteByUserId(userId: string): Promise<PlaylistId[]> {
    const { deletedIds } = await this._WR.deleteByUserId(userId);

    this._EB.publish(new PlaylistsDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }
}
