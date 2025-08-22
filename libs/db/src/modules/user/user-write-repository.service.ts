import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { User } from './user.schema';
import UserMapper from './user.mapper';
import { UserDocument } from './types';

@Injectable()
export class UserWriteRepository implements Domain.User.UserWriteRepository {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async save(entity: Domain.User.User) {
    const mappedDoc = UserMapper.toPersistenceEntity(entity);

    await this._userModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(userId: string) {
    const result = await this._userModel.deleteOne({ _id: userId }).exec();

    return result.deletedCount ? (userId as Domain.User.UserId) : null;
  }

  async findById(userId: string) {
    const foundDoc = await this._userModel.findOne({ _id: userId }).lean<User>().exec();

    return foundDoc ? UserMapper.toDomainEntity(foundDoc) : null;
  }

  async existsById(userId: string) {
    const foundDoc = await this._userModel.exists({ _id: userId });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.User.UserId) : null;
  }

  async existsByEmail(email: string) {
    const foundDoc = await this._userModel.exists({ email });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.User.UserId) : null;
  }

  async existsByUsername(username: string) {
    const foundDoc = await this._userModel.exists({ username });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.User.UserId) : null;
  }

  async getNextIndex() {
    return (await this._userModel.countDocuments()) + 1;
  }
}
