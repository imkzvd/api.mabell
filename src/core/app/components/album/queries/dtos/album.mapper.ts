import { AlbumDTO } from './album.dto';
import ArtistMapper from '../../../artist/queries/dtos/artist.mapper';
import { AlbumWithArtistsDTO } from '../../../../../domain/components/album/repository/dtos/album-with-artists.dto';

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
      dto.isActive,
      dto.isPublic,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default new AlbumMapper();
