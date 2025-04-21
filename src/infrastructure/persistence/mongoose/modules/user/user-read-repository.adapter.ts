import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserDocument } from './user.document';
import UserMapper from './user.mapper';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { UserFilter } from '../../../../../core/app/components/user/ports/repository/user.filter';
import { UserReadRepository } from '../../../../../core/app/components/user/ports/repository/user-read-repository.port';
import { UserDTO } from '../../../../../core/app/components/user/ports/repository/dtos/user.dto';

@Injectable()
export class UserReadRepositoryAdapter
  extends BaseReadRepository<UserDocument, UserDTO, UserFilter>
  implements UserReadRepository
{
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _userModel: Model<UserDocument>,
  ) {
    super(_userModel, UserMapper);
  }
}
