import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin as AdminDocument } from './admin.document';
import AdminMapper from './admin.mapper';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { AdminFilter } from '../../../../../core/app/components/admin/repository/admin.filter';
import { AdminReadRepository } from '../../../../../core/app/components/admin/repository/admin-read-repository.port';
import { AdminDTO } from '../../../../../core/app/components/admin/repository/dtos/admin.dto';

@Injectable()
export class AdminReadRepositoryAdapter
  extends BaseReadRepository<AdminDocument, AdminDTO, AdminFilter>
  implements AdminReadRepository
{
  constructor(
    @InjectModel(AdminDocument.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {
    super(_adminModel, AdminMapper);
  }
}
