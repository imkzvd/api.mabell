import { AlbumDocument } from './album.document';
import { IndexedAlbumDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { AlbumWithArtistsDTO } from '../../../../../core/domain/components/album/repository/dtos/album-with-artists.dto';

class AlbumMapper {
  toDocument(dto: AlbumWithArtistsDTO): AlbumDocument {
    return new AlbumDocument(
      dto.id,
      dto.name,
      dto.artists.map(({ id, name }) => ({ id, name })),
      dto.artists.map(({ name }) => name),
      dto.isPublic,
      dto.cover || undefined,
      dto.releaseAt || undefined,
    );
  }

  toDTO(doc: AlbumDocument): IndexedAlbumDTO {
    return new IndexedAlbumDTO(
      doc.id,
      doc.name,
      doc.artists,
      doc.cover || null,
      doc.releaseAt || null,
      doc.isPublic,
    );
  }
}

export default new AlbumMapper();
