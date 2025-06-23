import { IndexedTrackDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-track.dto';
import { TrackDTO } from '@core/app/components/track/dtos/track.dto';
import { IndexedAlbumDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { IndexedSimplifiedArtistDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-simplified-artist.dto';
import { Track } from './track.document';
import { TrackFactory } from './track.factory';

class TrackMapper {
  toDocument(dto: TrackDTO): Track {
    return TrackFactory.create(dto);
  }

  toDTO(doc: Track): IndexedTrackDTO {
    return new IndexedTrackDTO(
      doc.id,
      doc.name,
      new IndexedAlbumDTO(
        doc.album.id,
        doc.album.name,
        doc.album.artists.map(({ id, name }) => new IndexedSimplifiedArtistDTO(id, name)),
        doc.album.type,
        doc.album.cover || null,
      ),
      doc.featArtists.map(({ id, name }) => new IndexedSimplifiedArtistDTO(id, name)),
      doc.file || null,
      doc.duration || null,
      doc.isExplicit,
    );
  }
}

export default new TrackMapper();
