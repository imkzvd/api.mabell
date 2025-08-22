import { Types } from 'mongoose';
import { Domain, App } from '@api.mabell/core';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { UserRefreshToken } from './user-refresh-token.schema';
import { UserRefreshTokenDocument } from './types';

class UserRefreshTokenMapper
  implements
    WriteMapper<UserRefreshToken, Domain.UserRefreshToken.UserRefreshToken>,
    ReadMapper<UserRefreshTokenDocument, App.DTOs.UserRefreshTokenDTO>
{
  toPersistenceEntity(entity: Domain.UserRefreshToken.UserRefreshToken) {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      owner: entity.getOwner(),
      ip: entity.getIp(),
      userAgent: entity.getUserAgent(),
      createdAt: entity.getCreatedAt(),
    };
  }

  toDomainEntity(doc: UserRefreshToken | UserRefreshTokenDocument) {
    return Domain.UserRefreshToken.UserRefreshTokenFactory.create({
      id: doc._id.toHexString() as Domain.UserRefreshToken.UserRefreshTokenId,
      owner: doc.owner as Domain.User.UserId,
      ip: doc.ip,
      userAgent: doc.userAgent,
      createdAt: doc.createdAt,
    });
  }

  toDTO(doc: UserRefreshToken | UserRefreshTokenDocument) {
    return new App.DTOs.UserRefreshTokenDTO(
      doc._id.toHexString() as Domain.UserRefreshToken.UserRefreshTokenId,
      doc.owner as Domain.User.UserId,
      doc.ip,
      doc.userAgent,
      doc.createdAt,
    );
  }
}

export default new UserRefreshTokenMapper();
