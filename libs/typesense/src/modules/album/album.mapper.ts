import { IndexedAlbumDTO, IndexedSimplifiedArtistDTO } from '@api.mabell/core';
import { BaseMapper } from '../../base/base-mapper.interface';
import { AlbumPayload } from './types';
import { Album } from './album.document';
import { AlbumFactory } from './album.factory';

class AlbumMapper implements BaseMapper<Album, IndexedAlbumDTO, AlbumPayload> {
  toDocument(payload: AlbumPayload): Album {
    return AlbumFactory.create(payload);
  }

  toDTO(doc: Album): IndexedAlbumDTO {
    return new IndexedAlbumDTO(
      doc.id,
      doc.name,
      doc.artistIds.map((id, index) => new IndexedSimplifiedArtistDTO(id, doc.artistNames[index])),
      doc.cover || null,
    );
  }
}

export default new AlbumMapper();
