import { App } from '@api.mabell/core';
import { TrackPayload } from './types';
import { TrackFactory } from './track.factory';
import { Track } from './track.document';
import { BaseMapper } from '../../base/base-mapper.interface';

class TrackMapper implements BaseMapper<Track, App.DTOs.IndexedTrackDTO, TrackPayload> {
  toDocument(payload: TrackPayload): Track {
    return TrackFactory.create(payload);
  }

  toDTO(doc: Track): App.DTOs.IndexedTrackDTO {
    return new App.DTOs.IndexedTrackDTO(
      doc.id,
      doc.name,
      new App.DTOs.IndexedAlbumDTO(
        doc.albumId,
        doc.albumName,
        doc.artistIds.map(
          (id, index) => new App.DTOs.IndexedSimplifiedArtistDTO(id, doc.artistNames[index]),
        ),
        doc.cover || null,
      ),
      doc.featArtistIds.map(
        (id, index) => new App.DTOs.IndexedSimplifiedArtistDTO(id, doc.featArtistNames[index]),
      ),
      doc.isExplicit,
    );
  }
}

export default new TrackMapper();
