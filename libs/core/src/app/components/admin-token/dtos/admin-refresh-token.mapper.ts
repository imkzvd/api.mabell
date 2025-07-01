import { AdminRefreshTokenDTO as AdminRefreshTokenRepositoryDTO } from '../../../../domain/components/admin-refresh-token/repository/dtos/admin-refresh-token.dto';
import { AdminRefreshTokenDTO } from './admin-refresh-token.dto';

class AdminRefreshTokenMapper {
  toDTO(dto: AdminRefreshTokenRepositoryDTO): AdminRefreshTokenDTO {
    return new AdminRefreshTokenDTO(
      dto.id,
      dto.owner,
      dto.role,
      dto.ip,
      dto.userAgent,
      dto.createdAt,
    );
  }
}

export default new AdminRefreshTokenMapper();
