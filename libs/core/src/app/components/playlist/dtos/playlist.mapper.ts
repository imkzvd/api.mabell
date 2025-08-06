import { PlaylistWithUserDTO } from '@core/domain/components/playlist/repository/dtos/playlist-with-user.dto';
import { PlaylistDTO } from './playlist.dto';

class PlaylistMapper {
  toDTO(dto: PlaylistWithUserDTO): PlaylistDTO {
    return new PlaylistDTO(
      dto.id,
      dto.user,
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
