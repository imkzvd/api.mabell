import { Inject } from '@nestjs/common';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../domain/components/playlist/repository/playlist-write-repository.port';
import {
  PLAYLIST_READ_REPOSITORY_DI_TOKEN,
  PlaylistReadRepository,
} from '../../../domain/components/playlist/repository/playlist-read-repository.port';
import { PlaylistFactory } from '../../../domain/components/playlist/playlist.factory';
import { CreatePlaylistPayload, UpdatePlaylistCoverPayload, UpdatePlaylistPayload } from './types';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id.service.port';
import { NotFoundException } from '../../../shared/exceptions';
import { PlaylistId } from '../../../domain/components/playlist/types';
import { TrackId } from '../../../domain/components/track/types';
import { PlaylistDTO } from './dtos/playlist.dto';
import PlaylistMapper from './dtos/playlist.mapper';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../common/ports/file-storages/user-file-storage.port';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../common/ports/file-storages/tmp-file-storage.port';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { PlaylistCreatedEvent } from '../../common/events/playlist-created.event';
import { PlaylistUpdatedEvent } from '../../common/events/playlist-updated.event';
import { PlaylistDeletedEvent } from '../../common/events/playlist-deleted.event';
import { PlaylistsDeletedEvent } from '../../common/events/playlists-deleted.event';

export class PlaylistService {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _EB: EventBus,
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN) private readonly _wr: PlaylistWriteRepository,
    @Inject(PLAYLIST_READ_REPOSITORY_DI_TOKEN) private readonly _rr: PlaylistReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _idService: IdService<PlaylistId>,
    @Inject(TMP_FILE_STORAGE_DI_TOKEN) private readonly _tmpFS: TmpFileStorage,
    @Inject(USER_FILE_STORAGE_DI_TOKEN) private readonly _userFS: UserFileStorage,
  ) {}

  async createPlaylist(payload: CreatePlaylistPayload): Promise<PlaylistId> {
    const generatedId = this._idService.generate();
    const nextPlaylistIndex = await this._wr.getNextPlaylistIndexByOwnerId(payload.ownerId);
    const createdPlaylist = PlaylistFactory.create({
      id: generatedId,
      owner: payload.ownerId,
      name: `Playlist #${nextPlaylistIndex}`,
    });

    await this._wr.save(createdPlaylist);
    this._EB.publish(new PlaylistCreatedEvent({ id: generatedId }));

    return generatedId;
  }

  async updatePlaylist(id: string, payload: UpdatePlaylistPayload): Promise<PlaylistId> {
    const foundPlaylist = await this._wr.findById(id);

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

    await this._wr.save(foundPlaylist);
    this._EB.publish(new PlaylistUpdatedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async updatePlaylistCover(id: string, payload: UpdatePlaylistCoverPayload): Promise<PlaylistId> {
    const foundPlaylist = await this._wr.findById(id);

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

    await this._wr.save(foundPlaylist);
    this._EB.publish(new PlaylistUpdatedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async deletePlaylistCover(id: string): Promise<PlaylistId> {
    const foundPlaylist = await this._wr.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.deleteCover();
    await this._wr.save(foundPlaylist);
    await this._userFS.deletePlaylistCover(foundPlaylist.getOwner(), foundPlaylist.getId());
    this._EB.publish(new PlaylistUpdatedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async deletePlaylist(id: string): Promise<PlaylistId> {
    const foundPlaylist = await this._wr.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    await this._wr.deleteById(id);
    await this._userFS.deletePlaylistDirectory(foundPlaylist.getOwner(), foundPlaylist.getId());
    this._EB.publish(new PlaylistDeletedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async addTrackInPlaylist(id: string, trackId: TrackId): Promise<PlaylistId> {
    const foundPlaylist = await this._wr.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.addTrack(trackId);
    await this._wr.save(foundPlaylist);
    this._EB.publish(new PlaylistUpdatedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async deleteTrackFromPlaylist(id: string, trackId: TrackId): Promise<PlaylistId> {
    const foundPlaylist = await this._wr.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.deleteTrack(trackId);
    await this._wr.save(foundPlaylist);
    this._EB.publish(new PlaylistUpdatedEvent({ id: foundPlaylist.getId() }));

    return foundPlaylist.getId();
  }

  async deletePlaylistsByOwnerId(ownerId: string): Promise<PlaylistId[]> {
    const { deletedIds } = await this._wr.deleteByOwnerId(ownerId);

    this._EB.publish(new PlaylistsDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }

  async getPlaylist(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistDTO | null> {
    const foundPlaylist = await this._rr.findById(id, options);

    return foundPlaylist ? PlaylistMapper.toDTO(foundPlaylist) : null;
  }

  async getPlaylistTrackIds(
    id: string,
    options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<{ id: TrackId; addedAt: Date }[]> {
    const foundPlaylist = await this._rr.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    return foundPlaylist.tracks.splice(
      options?.pagination?.offset || 0,
      (options?.pagination?.offset || 0) + (options?.pagination?.limit || 25),
    );
  }
}
