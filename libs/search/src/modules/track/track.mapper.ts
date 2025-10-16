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
      doc.albumId,
      new App.DTOs.IndexedSimplifiedAlbumDTO(doc.albumId, doc.albumName),
      doc.artistIds,
      doc.artistIds.map(
        (id, index) => new App.DTOs.IndexedSimplifiedArtistDTO(id, doc.artistNames[index]),
      ),
      doc.featArtistIds,
      // TODO: delete filter!
      doc.featArtistPublic
        .filter((isPublic) => isPublic)
        .map(
          (_, index) =>
            new App.DTOs.IndexedSimplifiedArtistDTO(
              doc.featArtistIds[index],
              doc.featArtistNames[index],
            ),
        ),
      doc.cover || null,
      doc.isExplicit,
    );
  }
}

export default new TrackMapper();
