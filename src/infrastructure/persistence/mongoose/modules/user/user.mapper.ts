import { Types } from 'mongoose';
import { User as UserDocument } from './user.document';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { User, UserId } from '../../../../../core/domain/components/user/user.entity';
import { UserFactory } from '../../../../../core/domain/components/user/user.factory';
import { HashedPasswordVO } from '../../../../../core/domain/common/vos/hashed-password.vo';
import { UserDTO } from '../../../../../core/app/components/user/ports/repository/dtos/user.dto';

class UserMapper implements WriteMapper<UserDocument, User>, ReadMapper<UserDocument, UserDTO> {
  toDocument(entity: User): UserDocument {
    return {
      _id: new Types.ObjectId(entity.getId()),
      username: entity.getUsername().value,
      password: entity.getPassword().value,
      email: entity.getEmail()?.value || null,
      name: entity.getName().value,
      birthDate: entity.getBirthDate(),
      region: entity.getRegion().value,
      genres: entity.getGenres().map(({ value }) => value),
      avatar: entity.getAvatar(),
      color: entity.getColor(),
      isBlocked: entity.getBlockedStatus(),
      isVerified: entity.getVerifiedStatus(),
      isPremium: entity.getPremiumStatus(),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toEntity(doc: UserDocument): User {
    return UserFactory.create({
      id: doc._id.toHexString() as UserId,
      username: doc.username,
      password: HashedPasswordVO.create(doc.password),
      name: doc.name,
      email: doc.email,
      birthDate: doc.birthDate,
      region: doc.region,
      genres: doc.genres,
      avatar: doc.avatar,
      color: doc.color,
      isBlocked: doc.isBlocked,
      isVerified: doc.isVerified,
      isPremium: doc.isPremium,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: UserDocument): UserDTO {
    return new UserDTO(
      doc._id.toHexString(),
      doc.username,
      doc.name,
      doc.email,
      doc.birthDate,
      doc.region,
      doc.genres,
      doc.avatar,
      doc.color,
      doc.isBlocked,
      doc.isVerified,
      doc.isPublic,
      doc.isPremium,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  toPopulatedDTO(doc: UserDocument): UserDTO {
    return this.toDTO(doc);
  }
}

export default new UserMapper();
