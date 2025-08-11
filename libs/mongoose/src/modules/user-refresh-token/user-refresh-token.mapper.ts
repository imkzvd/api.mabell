import { Types } from 'mongoose';
import {
  UserRefreshToken as DomainUserRefreshToken,
  UserRefreshTokenDTO,
  UserRefreshTokenFactory,
  UserRefreshTokenId,
  UserId,
} from '@api.mabell/core';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { UserRefreshToken } from './user-refresh-token.schema';
import { UserRefreshTokenDocument } from './types';

class UserRefreshTokenMapper
  implements
    WriteMapper<UserRefreshToken, DomainUserRefreshToken>,
    ReadMapper<UserRefreshTokenDocument, UserRefreshTokenDTO>
{
  toPersistenceEntity(entity: DomainUserRefreshToken): UserRefreshToken {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      owner: entity.getOwner(),
      ip: entity.getIp(),
      userAgent: entity.getUserAgent(),
      createdAt: entity.getCreatedAt(),
    };
  }

  toDomainEntity(doc: UserRefreshToken | UserRefreshTokenDocument): DomainUserRefreshToken {
    return UserRefreshTokenFactory.create({
      id: doc._id.toHexString() as UserRefreshTokenId,
      owner: doc.owner as UserId,
      ip: doc.ip,
      userAgent: doc.userAgent,
      createdAt: doc.createdAt,
    });
  }

  toDTO(doc: UserRefreshToken | UserRefreshTokenDocument): UserRefreshTokenDTO {
    return new UserRefreshTokenDTO(
      doc._id.toHexString() as UserRefreshTokenId,
      doc.owner as UserId,
      doc.ip,
      doc.userAgent,
      doc.createdAt,
    );
  }
}

export default new UserRefreshTokenMapper();
