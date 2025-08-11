import { IndexedPlaylistDTO, IndexedSimplifiedUserDTO } from '@api.mabell/core';
import { Playlist } from './playlist.document';
import { PlaylistPayload } from './types';
import { PlaylistFactory } from './playlist.factory';
import { BaseMapper } from '../../base/base-mapper.interface';

class PlaylistMapper implements BaseMapper<Playlist, IndexedPlaylistDTO, PlaylistPayload> {
  toDocument(payload: PlaylistPayload): Playlist {
    return PlaylistFactory.create(payload);
  }

  toDTO(doc: Playlist): IndexedPlaylistDTO {
    return new IndexedPlaylistDTO(
      doc.id,
      doc.name,
      new IndexedSimplifiedUserDTO(doc.userId, doc.userName),
      doc.cover || null,
    );
  }
}

export default new PlaylistMapper();
