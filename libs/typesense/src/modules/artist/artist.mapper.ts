import { IndexedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-artist.dto';
import { ArtistFactory } from '@infrastructure/typesense/modules/artist/artist.factory';
import { Artist } from '@infrastructure/typesense/modules/artist/artist.document';
import { BaseMapper } from '@infrastructure/typesense/base/base-mapper.interface';
import { ArtistPayload } from '@infrastructure/typesense/modules/artist/types';

class ArtistMapper implements BaseMapper<Artist, IndexedArtistDTO, ArtistPayload> {
  toDocument(payload: ArtistPayload): Artist {
    return ArtistFactory.create(payload);
  }

  toDTO(doc: Artist): IndexedArtistDTO {
    return new IndexedArtistDTO(doc.id, doc.name, doc.avatar || null);
  }
}

export default new ArtistMapper();
