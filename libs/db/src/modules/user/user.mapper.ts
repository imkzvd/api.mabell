import { Types } from 'mongoose';
import { App, Domain } from '@api.mabell/core';
import type { User } from './user.schema';
import { UserDocument } from './types';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';

class UserMapper
  implements WriteMapper<User, Domain.User.User>, ReadMapper<User, App.DTOs.UserDTO>
{
  toPersistenceEntity(entity: Domain.User.User) {
    return {
      _id: new Types.ObjectId(entity.getId()),
      username: entity.getUsername().value,
      password: entity.getPassword().value,
      email: entity.getEmail()?.value || null,
      name: entity.getName().value,
      birthDate: entity.getBirthDate()?.value || null,
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

  toDomainEntity(doc: User | UserDocument) {
    return Domain.User.UserFactory.create({
      id: doc._id.toHexString() as Domain.User.UserId,
      username: doc.username,
      password: doc.password,
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

  toDTO(doc: User | UserDocument) {
    return new App.DTOs.UserDTO(
      doc._id.toHexString() as Domain.User.UserId,
      doc.username,
      doc.password,
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
}

export default new UserMapper();
