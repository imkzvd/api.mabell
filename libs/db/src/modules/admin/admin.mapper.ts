import { Types } from 'mongoose';
import { Domain, App } from '@api.mabell/core';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { AdminDocument } from './types';
import type { Admin } from './admin.schema';

class AdminMapper
  implements WriteMapper<Admin, Domain.Admin.Admin>, ReadMapper<Admin, App.DTOs.AdminDTO>
{
  toPersistenceEntity(entity: Domain.Admin.Admin): Admin {
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

  toDomainEntity(doc: AdminDocument | Admin): Domain.Admin.Admin {
    return Domain.Admin.AdminFactory.create({
      id: doc._id.toHexString() as Domain.Admin.AdminId,
      username: doc.username,
      password: doc.password,
      name: doc.name,
      isBlocked: doc.isBlocked,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: AdminDocument | Admin): App.DTOs.AdminDTO {
    return new App.DTOs.AdminDTO(
      doc._id.toHexString() as Domain.Admin.AdminId,
      doc.username,
      doc.password,
      doc.name,
      doc.isBlocked,
      doc.role,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new AdminMapper();
