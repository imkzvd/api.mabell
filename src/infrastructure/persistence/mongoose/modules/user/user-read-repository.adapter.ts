import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserDocument } from './user.document';
import UserMapper from './user.mapper';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { UserDTO } from '../../../../../core/app/components/user/dtos/user.dto';
import { SimplifiedUserDTO } from '../../../../../core/app/components/user/dtos/simplified-user.dto';
import { UserFilter } from '../../../../../core/app/components/user/ports/repository/user.filter';
import { UserReadRepository } from '../../../../../core/app/components/user/ports/repository/user-read-repository.port';

@Injectable()
export class UserReadRepositoryAdapter
  extends BaseReadRepository<UserDocument, UserDTO, SimplifiedUserDTO, UserFilter>
  implements UserReadRepository
{
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _userModel: Model<UserDocument>,
  ) {
    super(_userModel, UserMapper);
  }
}
