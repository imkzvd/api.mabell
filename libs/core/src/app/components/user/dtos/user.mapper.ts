import { UserDTO } from './user.dto';
import { UserDTO as UserRepositoryDTO } from '../../../../domain/components/user/repository/dtos/user.dto';

class UserMapper {
  toDTO(dto: UserRepositoryDTO): UserDTO {
    return new UserDTO(
      dto.id,
      dto.username,
      dto.name,
      dto.email,
      dto.birthDate,
      dto.region,
      dto.genres,
      dto.avatar,
      dto.color,
      dto.isBlocked,
      dto.isVerified,
      dto.isPublic,
      dto.isPremium,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default new UserMapper();
