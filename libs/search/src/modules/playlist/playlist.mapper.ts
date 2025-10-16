import { App } from '@api.mabell/core';
import { Playlist } from './playlist.document';
import { PlaylistPayload } from './types';
import { PlaylistFactory } from './playlist.factory';
import { BaseMapper } from '../../base/base-mapper.interface';

class PlaylistMapper implements BaseMapper<Playlist, App.DTOs.IndexedPlaylistDTO, PlaylistPayload> {
  toDocument(payload: PlaylistPayload): Playlist {
    return PlaylistFactory.create(payload);
  }

  toDTO(doc: Playlist): App.DTOs.IndexedPlaylistDTO {
    return new App.DTOs.IndexedPlaylistDTO(
      doc.id,
      doc.name,
      doc.userId,
      new App.DTOs.IndexedSimplifiedUserDTO(doc.userId, doc.userName),
      doc.cover || null,
    );
  }
}

export default new PlaylistMapper();
