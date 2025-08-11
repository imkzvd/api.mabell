import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User as DomainUser,
  UserWriteRepository as UserWriteRepositoryPort,
  UserId,
} from '@api.mabell/core';
import { User } from './user.schema';
import UserMapper from './user.mapper';
import { UserDocument } from './types';

@Injectable()
export class UserWriteRepository implements UserWriteRepositoryPort {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async save(entity: DomainUser): Promise<void> {
    const mappedDoc = UserMapper.toPersistenceEntity(entity);

    return this._userModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<UserId | null> {
    const result = await this._userModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as UserId) : null;
  }

  async findById(id: string): Promise<DomainUser | null> {
    const foundDoc = await this._userModel.findOne({ _id: id }).lean<User>().exec();

    return foundDoc ? UserMapper.toDomainEntity(foundDoc) : null;
  }

  async existsById(id: string): Promise<UserId | null> {
    const foundDoc = await this._userModel.exists({ _id: id });

    return foundDoc ? (foundDoc._id.toHexString() as UserId) : null;
  }

  async existsByEmail(email: string): Promise<UserId | null> {
    const foundDoc = await this._userModel.exists({ email });

    return foundDoc ? (foundDoc._id.toHexString() as UserId) : null;
  }

  async existsByUsername(username: string): Promise<UserId | null> {
    const foundDoc = await this._userModel.exists({ username });

    return foundDoc ? (foundDoc._id.toHexString() as UserId) : null;
  }

  async getNextIndex(): Promise<number> {
    return (await this._userModel.countDocuments()) + 1;
  }
}
