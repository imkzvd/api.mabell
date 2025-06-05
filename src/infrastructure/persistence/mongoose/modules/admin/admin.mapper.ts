import { Types } from 'mongoose';
import type { Admin } from './admin.schema';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Admin as DomainEntity } from '../../../../../core/domain/components/admin/admin.entity';
import { AdminFactory } from '../../../../../core/domain/components/admin/admin.factory';
import { HashedPasswordVO } from '../../../../../core/domain/common/vos/hashed-password.vo';
import { AdminDocument } from './types';
import { AdminDTO } from '../../../../../core/domain/components/admin/repository/dtos/admin.dto';
import { AdminId } from '../../../../../core/domain/components/admin/types';

class AdminMapper implements WriteMapper<Admin, DomainEntity>, ReadMapper<Admin, AdminDTO> {
  toPersistenceEntity(entity: DomainEntity): Admin {
    return {
      _id: new Types.ObjectId(entity.getId()),
      username: entity.getUsername().value,
      password: entity.getPassword().value,
      name: entity.getName().value,
      role: entity.getRole().value,
      isBlocked: entity.getBlockedStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toDomainEntity(doc: AdminDocument | Admin): DomainEntity {
    return AdminFactory.create({
      id: doc._id.toHexString() as AdminId,
      username: doc.username,
      password: HashedPasswordVO.create(doc.password),
      name: doc.name,
      isBlocked: doc.isBlocked,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: AdminDocument | Admin): AdminDTO {
    return new AdminDTO(
      doc._id.toHexString() as AdminId,
      doc.username,
      doc.name,
      doc.isBlocked,
      doc.role,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new AdminMapper();
