import { TrackDTO } from './track.dto';
import { PlaylistTrackDTO } from './playlist-track.dto';
import { TrackWithAlbumAndArtistsDTO } from '../../../../domain/components/track';
import AlbumMapper from '../../album/dtos/album.mapper';
import ArtistMapper from '../../artist/dtos/artist.mapper';

class TrackMapper {
  toDTO(dto: TrackWithAlbumAndArtistsDTO): TrackDTO {
    return new TrackDTO(
      dto.id,
      dto.name,
      AlbumMapper.toDTO(dto.album),
      dto.artists.map((i) => ArtistMapper.toDTO(i)),
      dto.featArtists.map((i) => ArtistMapper.toDTO(i)),
      dto.file,
      dto.duration,
      dto.trackNumber,
      dto.isExplicit,
      dto.isActive,
      dto.isPublic,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  toPlaylistTrackDTO(dto: TrackWithAlbumAndArtistsDTO, addedAt: Date): PlaylistTrackDTO {
    return new PlaylistTrackDTO(this.toDTO(dto), dto.id, addedAt);
  }
}

export default new TrackMapper();
