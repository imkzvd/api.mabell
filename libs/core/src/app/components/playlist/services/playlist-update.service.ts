import { NotFoundException } from '@core/shared/exceptions';
import { PlaylistWriteRepository } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistReadRepository } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { PlaylistUpdatedEvent } from '@core/app/common/events/playlist/playlist-updated.event';
import { UpdatePlaylistCoverPayload, UpdatePlaylistPayload } from '../types';

export class PlaylistUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: PlaylistWriteRepository,
    private readonly _RR: PlaylistReadRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _userFS: UserFileStorage,
  ) {}

  async update(id: string, payload: UpdatePlaylistPayload): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    if (payload.name) {
      foundPlaylist.updateName(payload.name);
    }

    if (payload.genres) {
      foundPlaylist.updateGenres(payload.genres);
    }

    if (payload.description) {
      foundPlaylist.updateDescription(payload.description);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundPlaylist.updatePublicStatus(payload.isPublic);
    }

    await this._WR.save(foundPlaylist);

    const foundPlaylistWithOwner = await this._RR.findById(id);

    if (!foundPlaylistWithOwner) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(
      new PlaylistUpdatedEvent({
        id: foundPlaylistWithOwner.id,
        name: foundPlaylistWithOwner.name,
        owner: {
          id: foundPlaylistWithOwner.owner.id,
          name: foundPlaylistWithOwner.owner.name,
          isPublic: foundPlaylistWithOwner.owner.isPublic,
        },
        cover: foundPlaylistWithOwner.cover,
        isPublic: foundPlaylistWithOwner.isPublic,
      }),
    );

    return foundPlaylist.getId();
  }

  async updateCover(id: string, payload: UpdatePlaylistCoverPayload): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    if (payload.fileId) {
      const uploadedFile = await this._tmpFS.findById(payload.fileId);

      if (!uploadedFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._userFS.savePlaylistCover(
        foundPlaylist.getOwner(),
        foundPlaylist.getId(),
        uploadedFile,
      );

      foundPlaylist.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundPlaylist.updateColor(payload.color);
    }

    await this._WR.save(foundPlaylist);

    const foundPlaylistWithOwner = await this._RR.findById(id);

    if (!foundPlaylistWithOwner) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(
      new PlaylistUpdatedEvent({
        id: foundPlaylistWithOwner.id,
        name: foundPlaylistWithOwner.name,
        owner: {
          id: foundPlaylistWithOwner.owner.id,
          name: foundPlaylistWithOwner.owner.name,
          isPublic: foundPlaylistWithOwner.owner.isPublic,
        },
        cover: foundPlaylistWithOwner.cover,
        isPublic: foundPlaylistWithOwner.isPublic,
      }),
    );

    return foundPlaylist.getId();
  }

  async deleteCover(id: string): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.deleteCover();
    await this._WR.save(foundPlaylist);
    await this._userFS.deletePlaylistCover(foundPlaylist.getOwner(), foundPlaylist.getId());

    const foundPlaylistWithOwner = await this._RR.findById(id);

    if (!foundPlaylistWithOwner) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(
      new PlaylistUpdatedEvent({
        id: foundPlaylistWithOwner.id,
        name: foundPlaylistWithOwner.name,
        owner: {
          id: foundPlaylistWithOwner.owner.id,
          name: foundPlaylistWithOwner.owner.name,
          isPublic: foundPlaylistWithOwner.owner.isPublic,
        },
        cover: foundPlaylistWithOwner.cover,
        isPublic: foundPlaylistWithOwner.isPublic,
      }),
    );

    return foundPlaylist.getId();
  }

  async addTrack(id: string, trackId: TrackId): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.addTrack(trackId);
    await this._WR.save(foundPlaylist);

    const foundPlaylistWithOwner = await this._RR.findById(id);

    if (!foundPlaylistWithOwner) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(
      new PlaylistUpdatedEvent({
        id: foundPlaylistWithOwner.id,
        name: foundPlaylistWithOwner.name,
        owner: {
          id: foundPlaylistWithOwner.owner.id,
          name: foundPlaylistWithOwner.owner.name,
          isPublic: foundPlaylistWithOwner.owner.isPublic,
        },
        cover: foundPlaylistWithOwner.cover,
        isPublic: foundPlaylistWithOwner.isPublic,
      }),
    );

    return foundPlaylist.getId();
  }

  async deleteTrack(id: string, trackId: TrackId): Promise<PlaylistId> {
    const foundPlaylist = await this._WR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.deleteTrack(trackId);
    await this._WR.save(foundPlaylist);

    const foundPlaylistWithOwner = await this._RR.findById(id);

    if (!foundPlaylistWithOwner) {
      throw new NotFoundException('Playlist does not exist');
    }

    this._EB.publish(
      new PlaylistUpdatedEvent({
        id: foundPlaylistWithOwner.id,
        name: foundPlaylistWithOwner.name,
        owner: {
          id: foundPlaylistWithOwner.owner.id,
          name: foundPlaylistWithOwner.owner.name,
          isPublic: foundPlaylistWithOwner.owner.isPublic,
        },
        cover: foundPlaylistWithOwner.cover,
        isPublic: foundPlaylistWithOwner.isPublic,
      }),
    );

    return foundPlaylist.getId();
  }
}
