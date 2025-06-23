import { PlaylistWithOwnerDTO } from '@core/domain/components/playlist/repository/dtos/playlist-with-owner.dto';
import { PlaylistDTO } from './playlist.dto';

class PlaylistMapper {
  toDTO(dto: PlaylistWithOwnerDTO): PlaylistDTO {
    return new PlaylistDTO(
      dto.id,
      dto.owner,
      dto.name,
      dto.genres,
      dto.cover,
      dto.color,
      dto.description,
      dto.tracks,
      dto.isPublic,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default new PlaylistMapper();
