import { TrackDocument } from './track.document';
import { IndexedTrackDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-track.dto';
import { TrackDTO } from '../../../../../core/app/components/track/dtos/track.dto';

class TrackMapper {
  toDocument(dto: TrackDTO): TrackDocument {
    return new TrackDocument(
      dto.id,
      dto.name,
      {
        id: dto.album.id,
        name: dto.album.name,
        type: dto.album.type,
        releaseAt: dto.album.releaseAt || undefined,
      },
      dto.album.name,
      dto.artists.map(({ id, name }) => ({ id, name })),
      dto.featArtists.map(({ id, name }) => ({ id, name })),
      [...dto.artists.map(({ name }) => name), ...dto.featArtists.map(({ name }) => name)],
      dto.isPublic,
      dto.isExplicit,
      dto.file || undefined,
      dto.duration || undefined,
      dto.album.cover || undefined,
    );
  }

  toDTO(doc: TrackDocument): IndexedTrackDTO {
    return new IndexedTrackDTO(
      doc.id,
      doc.name,
      {
        ...doc.album,
        releaseAt: doc.album.releaseAt || null,
      },
      doc.artists,
      doc.featArtists,
      doc.cover || null,
      doc.file || null,
      doc.duration || null,
      doc.isPublic,
      doc.isExplicit,
    );
  }
}

export default new TrackMapper();
