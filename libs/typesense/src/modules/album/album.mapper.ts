import { IndexedAlbumDTO } from '@core/app/common/ports/search-service/dtos/indexed-album.dto';
import { IndexedSimplifiedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-simplified-artist.dto';
import { BaseMapper } from '@infrastructure/typesense/base/base-mapper.interface';
import { AlbumPayload } from '@infrastructure/typesense/modules/album/types';
import { Album } from '@infrastructure/typesense/modules/album/album.document';
import { AlbumFactory } from '@infrastructure/typesense/modules/album/album.factory';

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
