import { Types } from 'mongoose';
import { Domain, App } from '@api.mabell/core';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { AdminRefreshToken } from './admin-refresh-token.schema';
import { AdminRefreshTokenDocument } from './types';

class AdminRefreshTokenMapper
  implements
    WriteMapper<AdminRefreshToken, Domain.AdminRefreshToken.AdminRefreshToken>,
    ReadMapper<AdminRefreshTokenDocument, App.DTOs.AdminRefreshTokenDTO>
{
  toPersistenceEntity(entity: Domain.AdminRefreshToken.AdminRefreshToken): AdminRefreshToken {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      owner: entity.getOwner(),
      role: entity.getRole(),
      ip: entity.getIp(),
      userAgent: entity.getUserAgent(),
      createdAt: entity.getCreatedAt(),
    };
  }

  toDomainEntity(
    doc: AdminRefreshToken | AdminRefreshTokenDocument,
  ): Domain.AdminRefreshToken.AdminRefreshToken {
    return Domain.AdminRefreshToken.AdminRefreshTokenFactory.create({
      id: doc._id.toHexString() as Domain.AdminRefreshToken.AdminRefreshTokenId,
      owner: doc.owner as Domain.Admin.AdminId,
      role: doc.role as Domain.Admin.AdminRole,
      ip: doc.ip,
      userAgent: doc.userAgent,
      createdAt: doc.createdAt,
    });
  }

  toDTO(doc: AdminRefreshToken | AdminRefreshTokenDocument): App.DTOs.AdminRefreshTokenDTO {
    return new App.DTOs.AdminRefreshTokenDTO(
      doc._id.toHexString() as Domain.AdminRefreshToken.AdminRefreshTokenId,
      doc.owner as Domain.Admin.AdminId,
      doc.role,
      doc.ip,
      doc.userAgent,
      doc.createdAt,
    );
  }
}

export default new AdminRefreshTokenMapper();
