import { TrackWithAlbumAndArtistsDTO } from '@core/domain/components/track/repository/dtos/track-with-album-and-artists.dto';
import AlbumMapper from '@core/app/components/album/dtos/album.mapper';
import ArtistMapper from '@core/app/components/artist/dtos/artist.mapper';
import { TrackDTO } from './track.dto';
import { PlaylistTrackDTO } from './playlist-track.dto';

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
      dto.isExplicit,
      dto.isActive,
      dto.isPublic,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  toPlaylistTrackDTO(dto: TrackWithAlbumAndArtistsDTO, addedAt: Date): PlaylistTrackDTO {
    return new PlaylistTrackDTO(this.toDTO(dto), addedAt);
  }
}

export default new TrackMapper();
