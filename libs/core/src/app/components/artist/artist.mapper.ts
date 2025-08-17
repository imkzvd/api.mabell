import { ArtistDTO as ArtistRepositoryDTO } from '../../../../domain/components/artist';
import { ArtistDTO } from './artist.dto';

class ArtistMapper {
  toDTO(dto: ArtistRepositoryDTO): ArtistDTO {
    return new ArtistDTO(
      dto.id,
      dto.name,
      dto.birthName,
      dto.birthDate,
      dto.genres,
      dto.biography,
      dto.avatar,
      dto.cover,
      dto.accentColor,
      dto.secondaryColor,
      dto.isActive,
      dto.isPublic,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default new ArtistMapper();
