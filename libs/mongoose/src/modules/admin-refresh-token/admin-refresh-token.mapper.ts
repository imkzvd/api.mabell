import { Types } from 'mongoose';
import {
  AdminRefreshToken as DomainAdminRefreshToken,
  AdminRefreshTokenDTO,
  AdminRefreshTokenFactory,
  AdminRefreshTokenId,
  AdminId,
  AdminRole,
} from '@api.mabell/core';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { AdminRefreshToken } from './admin-refresh-token.schema';
import { AdminRefreshTokenDocument } from './types';

class AdminRefreshTokenMapper
  implements
    WriteMapper<AdminRefreshToken, DomainAdminRefreshToken>,
    ReadMapper<AdminRefreshTokenDocument, AdminRefreshTokenDTO>
{
  toPersistenceEntity(entity: DomainAdminRefreshToken): AdminRefreshToken {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      owner: entity.getOwner(),
      role: entity.getRole(),
      ip: entity.getIp(),
      userAgent: entity.getUserAgent(),
      createdAt: entity.getCreatedAt(),
    };
  }

  toDomainEntity(doc: AdminRefreshToken | AdminRefreshTokenDocument): DomainAdminRefreshToken {
    return AdminRefreshTokenFactory.create({
      id: doc._id.toHexString() as AdminRefreshTokenId,
      owner: doc.owner as AdminId,
      role: doc.role as AdminRole,
      ip: doc.ip,
      userAgent: doc.userAgent,
      createdAt: doc.createdAt,
    });
  }

  toDTO(doc: AdminRefreshToken | AdminRefreshTokenDocument): AdminRefreshTokenDTO {
    return new AdminRefreshTokenDTO(
      doc._id.toHexString() as AdminRefreshTokenId,
      doc.owner as AdminId,
      doc.role as AdminRole,
      doc.ip,
      doc.userAgent,
      doc.createdAt,
    );
  }
}

export default new AdminRefreshTokenMapper();
