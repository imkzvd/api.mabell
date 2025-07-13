import { IndexedTrackDTO } from '@core/app/common/ports/search-service/dtos/indexed-track.dto';
import { IndexedAlbumDTO } from '@core/app/common/ports/search-service/dtos/indexed-album.dto';
import { IndexedSimplifiedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-simplified-artist.dto';
import { TrackPayload } from '@infrastructure/typesense/modules/track/types';
import { TrackFactory } from '@infrastructure/typesense/modules/track/track.factory';
import { Track } from '@infrastructure/typesense/modules/track/track.document';

class TrackMapper {
  toDocument(payload: TrackPayload): Track {
    return TrackFactory.create(payload);
  }

  toDTO(doc: Track): IndexedTrackDTO {
    return new IndexedTrackDTO(
      doc.id,
      doc.name,
      new IndexedAlbumDTO(
        doc.albumId,
        doc.albumName,
        doc.artistIds.map(
          (id, index) => new IndexedSimplifiedArtistDTO(id, doc.artistNames[index]),
        ),
        doc.cover || null,
      ),
      doc.featArtistIds.map(
        (id, index) => new IndexedSimplifiedArtistDTO(id, doc.featArtistNames[index]),
      ),
      doc.isExplicit,
    );
  }
}

export default new TrackMapper();
