import { UserRefreshTokenDTO as UserRefreshTokenRepositoryDTO } from '../../../../domain/components/user-refresh-token';
import { UserRefreshTokenDTO } from './user-refresh-token.dto';

class UserRefreshTokenMapper {
  toDTO(dto: UserRefreshTokenRepositoryDTO): UserRefreshTokenDTO {
    return new UserRefreshTokenDTO(dto.id, dto.owner, dto.ip, dto.userAgent, dto.createdAt);
  }
}

export default new UserRefreshTokenMapper();
