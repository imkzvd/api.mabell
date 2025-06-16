import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { RefreshToken as DomainRefreshToken } from '../../../../../core/domain/components/refresh-token/refresh-token.entity';
import { RefreshToken } from './refresh-token.schema';
import { RefreshTokenDTO } from '../../../../../core/domain/components/refresh-token/repository/dtos/refresh-token.dto';
import { RefreshTokenDocument } from './types';
import { Types } from 'mongoose';
import { RefreshTokenFactory } from '../../../../../core/domain/components/refresh-token/refresh-token.factory';
import { UserId } from '../../../../../core/domain/components/user/types';
import { AdminId } from '../../../../../core/domain/components/admin/types';
import { RefreshTokenId } from '../../../../../core/domain/components/refresh-token/types';

class RefreshTokenMapper
  implements
    WriteMapper<RefreshToken, DomainRefreshToken>,
    ReadMapper<RefreshTokenDocument, RefreshTokenDTO>
{
  toPersistenceEntity(entity: DomainRefreshToken): RefreshToken {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      owner: entity.getOwner(),
      ip: entity.getIp(),
      userAgent: entity.getUserAgent(),
      createdAt: entity.getCreatedAt(),
    };
  }

  toDomainEntity(doc: RefreshToken | RefreshTokenDocument): DomainRefreshToken {
    return RefreshTokenFactory.create({
      id: doc._id.toHexString() as RefreshTokenId,
      owner: doc.owner as AdminId | UserId,
      ip: doc.ip,
      userAgent: doc.userAgent,
      createdAt: doc.createdAt,
    });
  }

  toDTO(doc: RefreshToken | RefreshTokenDocument): RefreshTokenDTO {
    return new RefreshTokenDTO(
      doc._id.toHexString() as RefreshTokenId,
      doc.owner as AdminId | UserId,
      doc.ip,
      doc.userAgent,
      doc.createdAt,
    );
  }
}

export default new RefreshTokenMapper();
