import { TrackDTO } from './track.dto';
import { TrackWithAlbumAndArtistsDTO } from '../../ports/repository/dtos/track-with-album-and-artists.dto';
import ArtistMapper from '../../../artist/queries/dtos/artist.mapper';
import AlbumMapper from '../../../album/queries/dtos/album.mapper';

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
}

export default new TrackMapper();
