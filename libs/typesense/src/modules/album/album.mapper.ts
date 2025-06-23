import { Album } from './album.document';
import { IndexedAlbumDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { AlbumFactory } from './album.factory';
import { AlbumDTO } from '../../../../../core/app/components/album/dtos/album.dto';
import { IndexedSimplifiedArtistDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-simplified-artist.dto';

class AlbumMapper {
  toDocument(dto: AlbumDTO): Album {
    return AlbumFactory.create(dto);
  }

  toDTO(doc: Album): IndexedAlbumDTO {
    return new IndexedAlbumDTO(
      doc.id,
      doc.name,
      doc.artists.map(({ id, name }) => new IndexedSimplifiedArtistDTO(id, name)),
      doc.type,
      doc.cover || null,
    );
  }
}

export default new AlbumMapper();
