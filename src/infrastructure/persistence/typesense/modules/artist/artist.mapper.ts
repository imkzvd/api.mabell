import { ArtistDocument } from './artist.document';
import { IndexedArtistDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-artist.dto';
import { ArtistDTO } from '../../../../../core/domain/components/artist/repository/dtos/artist.dto';

class ArtistMapper {
  toDocument(dto: ArtistDTO): ArtistDocument {
    return new ArtistDocument(
      dto.id,
      dto.name,
      dto.isPublic,
      dto.birthName || undefined,
      dto.avatar || undefined,
    );
  }

  toDTO(doc: ArtistDocument): IndexedArtistDTO {
    return new IndexedArtistDTO(
      doc.id,
      doc.name,
      doc.birthName || null,
      doc.avatar || null,
      doc.isPublic,
    );
  }
}

export default new ArtistMapper();
