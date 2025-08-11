import { IndexedTrackDTO, IndexedAlbumDTO, IndexedSimplifiedArtistDTO } from '@api.mabell/core';
import { TrackPayload } from './types';
import { TrackFactory } from './track.factory';
import { Track } from './track.document';
import { BaseMapper } from '../../base/base-mapper.interface';

class TrackMapper implements BaseMapper<Track, IndexedTrackDTO, TrackPayload> {
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
