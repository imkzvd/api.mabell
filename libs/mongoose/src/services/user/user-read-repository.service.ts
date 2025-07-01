import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { UserDTO } from '@core/domain/components/user/repository/dtos/user.dto';
import UserMapper from './user.mapper';
import { User } from './user.schema';
import { UserDocument } from './types';

@Injectable()
export class UserReadRepository implements UserReadRepositoryPort {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async findById(id: string, options?: Partial<{ isPublic: boolean }>): Promise<UserDTO | null> {
    const foundDoc = await this._userModel
      .findOne(
        {
          _id: id,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .lean<User>()
      .exec();

    if (!foundDoc) {
      return null;
    }

    return UserMapper.toDTO(foundDoc);
  }

  async findByUsername(username: string): Promise<UserDTO | null> {
    const foundDoc = await this._userModel.findOne({ username }).lean<User>().exec();

    if (!foundDoc) {
      return null;
    }

    return UserMapper.toDTO(foundDoc);
  }
}
