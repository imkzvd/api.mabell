import { PlaylistWriteRepository } from '../../../../domain/components/playlist';
import { NotFoundException } from '../../../../shared/exceptions';
import { EventBus, UserFileStorage } from '../../../ports';
import { PlaylistId } from '../../../../domain/components/playlist/types';
import { PlaylistDeletedEvent, PlaylistsDeletedEvent } from '../../../events';

export class PlaylistDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _FS: UserFileStorage,
  ) {}

  async deleteById(playlistId: string): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(playlistId);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    await this._WR.deleteById(playlistId);
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
