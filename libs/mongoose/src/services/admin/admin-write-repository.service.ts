import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';
import AdminMapper from './admin.mapper';
import { AdminDocument } from './types';
import { Admin as AdminDomainEntity } from '../../../../../src/core/domain/components/admin/admin.entity';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '../../../../../src/core/domain/components/admin/repository/admin-write-repository.port';
import { AdminId } from '../../../../../src/core/domain/components/admin/types';

@Injectable()
export class AdminWriteRepository implements AdminWriteRepositoryPort {
  constructor(
    @InjectModel(Admin.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {}

  async save(entity: AdminDomainEntity): Promise<void> {
    const mappedDoc = AdminMapper.toPersistenceEntity(entity);

    return this._adminModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<AdminId | null> {
    const result = await this._adminModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as AdminId) : null;
  }

  async findById(id: string): Promise<AdminDomainEntity | null> {
    const foundDoc = await this._adminModel.findOne({ _id: id }).lean<Admin>().exec();

    return foundDoc ? AdminMapper.toDomainEntity(foundDoc) : null;
  }

  async existsByUsername(username: string): Promise<AdminId | null> {
    const foundDoc = await this._adminModel.exists({ username });

    return foundDoc ? (foundDoc._id.toHexString() as AdminId) : null;
  }

  async getNextIndex(): Promise<number> {
    return (await this._adminModel.countDocuments()) + 1;
  }
}
