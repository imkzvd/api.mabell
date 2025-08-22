import { UpdatePlaylistCoverPayload, UpdatePlaylistPayload } from '../types';
import { PlaylistWriteRepository } from '../../../../domain/components/playlist';
import { NotFoundException } from '../../../../shared/exceptions';
import { EventBus, PlaylistReadRepository, TmpFileStorage, UserFileStorage } from '../../../ports';
import { PlaylistId } from '../../../../domain/components/playlist/types';
import { PlaylistUpdatedEvent } from '../../../events';
import { TrackId } from '../../../../domain/components/track/types';
import { preparePlaylistEventPayload } from '../utils/prepare-playlist-event-payload.utility';

export class PlaylistUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _RR: PlaylistReadRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _userFS: UserFileStorage,
  ) {}

  async updateById(playlistId: string, payload: UpdatePlaylistPayload): Promise<PlaylistId> {
    const foundPlaylistEntity = await this._WR.findById(playlistId);

    if (!foundPlaylistEntity) {
      throw new NotFoundException('Playlist does not exist');
    }

    if (payload.name) {
      foundPlaylistEntity.updateName(payload.name);
    }

    if (payload.genres) {
      foundPlaylistEntity.updateGenres(payload.genres);
    }

    if (payload.description) {
      foundPlaylistEntity.updateDescription(payload.description);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundPlaylistEntity.updatePublicStatus(payload.isPublic);
    }

    await this._WR.save(foundPlaylistEntity);

    const foundPlaylist = await this._RR.findById(foundPlaylistEntity.getId());

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(new PlaylistUpdatedEvent(preparePlaylistEventPayload(foundPlaylist)));

    return foundPlaylist.id;
  }

  async updateCoverById(
    playlistId: string,
    payload: UpdatePlaylistCoverPayload,
  ): Promise<PlaylistId> {
    const foundPlaylistEntity = await this._WR.findById(playlistId);

    if (!foundPlaylistEntity) {
      throw new NotFoundException('Playlist does not exist');
    }

    if (payload.fileId) {
      const uploadedFile = await this._tmpFS.findById(payload.fileId);

      if (!uploadedFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._userFS.savePlaylistCover(
        foundPlaylistEntity.getUser(),
        foundPlaylistEntity.getId(),
        uploadedFile,
      );

      foundPlaylistEntity.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundPlaylistEntity.updateColor(payload.color);
    }

    await this._WR.save(foundPlaylistEntity);

    const foundPlaylist = await this._RR.findById(foundPlaylistEntity.getId());

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(new PlaylistUpdatedEvent(preparePlaylistEventPayload(foundPlaylist)));

    return foundPlaylist.id;
  }

  async deleteCoverById(playlistId: string): Promise<PlaylistId> {
    const foundPlaylistEntity = await this._WR.findById(playlistId);

    if (!foundPlaylistEntity) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylistEntity.deleteCover();
    await this._WR.save(foundPlaylistEntity);
    await this._userFS.deletePlaylistCover(
      foundPlaylistEntity.getUser(),
      foundPlaylistEntity.getId(),
    );

    const foundPlaylist = await this._RR.findById(foundPlaylistEntity.getId());

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(new PlaylistUpdatedEvent(preparePlaylistEventPayload(foundPlaylist)));

    return foundPlaylist.id;
  }

  async addTrack(id: string, trackId: TrackId): Promise<PlaylistId> {
    const foundPlaylistEntity = await this._WR.findById(id);

    if (!foundPlaylistEntity) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylistEntity.addTrack(trackId);
    await this._WR.save(foundPlaylistEntity);

    const foundPlaylist = await this._RR.findById(foundPlaylistEntity.getId());

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(new PlaylistUpdatedEvent(preparePlaylistEventPayload(foundPlaylist)));

    return foundPlaylist.id;
  }

  async deleteTrack(id: string, trackId: TrackId | string): Promise<PlaylistId> {
    const foundPlaylistEntity = await this._WR.findById(id);

    if (!foundPlaylistEntity) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylistEntity.deleteTrack(trackId);
    await this._WR.save(foundPlaylistEntity);

    const foundPlaylist = await this._RR.findById(foundPlaylistEntity.getId());

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(new PlaylistUpdatedEvent(preparePlaylistEventPayload(foundPlaylist)));

    return foundPlaylist.id;
  }
}
