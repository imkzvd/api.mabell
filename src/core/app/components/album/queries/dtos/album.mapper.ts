import { AlbumDTO } from './album.dto';
import { AlbumWithArtistsDTO } from '../../ports/repository/dtos/album-with-artists.dto';
import ArtistMapper from '../../../artist/queries/dtos/artist.mapper';

class AlbumMapper {
  toDTO(dto: AlbumWithArtistsDTO): AlbumDTO {
    return new AlbumDTO(
      dto.id,
      dto.name,
      dto.artists.map((artist) => ArtistMapper.toDTO(artist)),
      dto.type,
      dto.genres,
      dto.cover,
      dto.color,
      dto.description,
      dto.releaseAt,
      dto.tracks,
      dto.isActive,
      dto.isPublic,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default new AlbumMapper();
