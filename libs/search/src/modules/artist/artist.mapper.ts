import { App } from '@api.mabell/core';
import { ArtistFactory } from './artist.factory';
import { Artist } from './artist.document';
import { ArtistPayload } from './types';
import { BaseMapper } from '../../base/base-mapper.interface';

class ArtistMapper implements BaseMapper<Artist, App.DTOs.IndexedArtistDTO, ArtistPayload> {
  toDocument(payload: ArtistPayload): Artist {
    return ArtistFactory.create(payload);
  }

  toDTO(doc: Artist): App.DTOs.IndexedArtistDTO {
    return new App.DTOs.IndexedArtistDTO(doc.id, doc.name, doc.avatar || null);
  }
}

export default new ArtistMapper();
