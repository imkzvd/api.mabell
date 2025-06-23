import { IndexedArtistDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-artist.dto';
import { ArtistDTO } from '@core/domain/components/artist/repository/dtos/artist.dto';
import { Artist } from './artist.document';
import { ArtistFactory } from './artist.factory';

class ArtistMapper {
  toDocument(dto: ArtistDTO): Artist {
    return ArtistFactory.create(dto);
  }

  toDTO(doc: Artist): IndexedArtistDTO {
    return new IndexedArtistDTO(doc.id, doc.name, doc.avatar || null);
  }
}

export default new ArtistMapper();
