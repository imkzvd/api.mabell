import { Types } from 'mongoose';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { AdminRefreshToken as DomainAdminRefreshToken } from '../../../../../src/core/domain/components/admin-refresh-token/admin-refresh-token.entity';
import { AdminRefreshToken } from './admin-refresh-token.schema';
import { AdminRefreshTokenDocument } from './types';
import { AdminRefreshTokenDTO } from '../../../../../src/core/domain/components/admin-refresh-token/repository/dtos/admin-refresh-token.dto';
import { AdminRefreshTokenFactory } from '../../../../../src/core/domain/components/admin-refresh-token/admin-refresh-token.factory';
import { AdminRefreshTokenId } from '../../../../../src/core/domain/components/admin-refresh-token/types';
import { AdminId } from '../../../../../src/core/domain/components/admin/types';
import { AdminRole } from '../../../../../src/core/domain/components/admin/constants/admin-roles';

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
