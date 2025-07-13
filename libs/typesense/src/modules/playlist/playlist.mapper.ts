import { IndexedPlaylistDTO } from '@core/app/common/ports/search-service/dtos/indexed-playlist.dto';
import { IndexedSimplifiedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-simplified-user.dto';
import { BaseMapper } from '@infrastructure/typesense/base/base-mapper.interface';
import { Playlist } from '@infrastructure/typesense/modules/playlist/playlist.document';
import { PlaylistPayload } from '@infrastructure/typesense/modules/playlist/types';
import { PlaylistFactory } from '@infrastructure/typesense/modules/playlist/playlist.factory';

class PlaylistMapper implements BaseMapper<Playlist, IndexedPlaylistDTO, PlaylistPayload> {
  toDocument(payload: PlaylistPayload): Playlist {
    return PlaylistFactory.create(payload);
  }

  toDTO(doc: Playlist): IndexedPlaylistDTO {
    return new IndexedPlaylistDTO(
      doc.id,
      doc.name,
      new IndexedSimplifiedUserDTO(doc.ownerId, doc.ownerName),
      doc.cover || null,
    );
  }
}

export default new PlaylistMapper();
