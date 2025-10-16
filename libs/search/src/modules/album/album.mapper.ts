import { App } from '@api.mabell/core';
import { BaseMapper } from '../../base/base-mapper.interface';
import { AlbumPayload } from './types';
import { Album } from './album.document';
import { AlbumFactory } from './album.factory';

class AlbumMapper implements BaseMapper<Album, App.DTOs.IndexedAlbumDTO, AlbumPayload> {
  toDocument(payload: AlbumPayload): Album {
    return AlbumFactory.create(payload);
  }

  toDTO(doc: Album): App.DTOs.IndexedAlbumDTO {
    return new App.DTOs.IndexedAlbumDTO(
      doc.id,
      doc.name,
      doc.artistIds,
      doc.artistIds.map(
        (id, index) => new App.DTOs.IndexedSimplifiedArtistDTO(id, doc.artistNames[index]),
      ),
      doc.cover || null,
    );
  }
}

export default new AlbumMapper();
