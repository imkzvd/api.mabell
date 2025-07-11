import { AdminDTO as AdminRepositoryDTO } from '@core/domain/components/admin/repository/dtos/admin.dto';
import { AdminDTO } from './admin.dto';

class AdminMapper {
  toDTO(dto: AdminRepositoryDTO): AdminDTO {
    return new AdminDTO(
      dto.id,
      dto.username,
      dto.name,
      dto.isBlocked,
      dto.role,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default new AdminMapper();
