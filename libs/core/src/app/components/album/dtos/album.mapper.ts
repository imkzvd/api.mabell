import { AlbumWithArtistsDTO } from '@core/domain/components/album/repository/dtos/album-with-artists.dto';
import ArtistMapper from '@core/app/components/artist/dtos/artist.mapper';
import { AlbumDTO } from './album.dto';

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
