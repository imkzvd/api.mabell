import { USER_MIN_LENGTH_PASSWORD } from './constants';
import { UserFactory } from '../../../domain/components/user/user.factory';
import { UserDTO } from './dtos/user.dto';
import { Inject } from '@nestjs/common';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../domain/components/user/repository/user-write-repository.port';
import {
  USER_READ_REPOSITORY_DI_TOKEN,
  UserReadRepository,
} from '../../../domain/components/user/repository/user-read-repository.port';
import UserMapper from './dtos/user.mapper';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id-service.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../common/ports/password-service.port';
import {
  RegisterUserPayload,
  UpdateUserAvatarPayload,
  UpdateUserPasswordPayload,
  UpdateUserPayload,
} from './types';
import {
  BadRequestException,
  DuplicationException,
  NotFoundException,
  UnauthorizedException,
} from '../../../shared/exceptions';
import { UserId } from '../../../domain/components/user/types';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../common/ports/file-storages/user-file-storage.port';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../common/ports/file-storages/tmp-file-storage.port';

export class UserService {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN) private readonly _wr: UserWriteRepository,
    @Inject(USER_READ_REPOSITORY_DI_TOKEN) private readonly _rr: UserReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _idService: IdService<UserId>,
    @Inject(PASSWORD_SERVICE_DI_TOKEN) private readonly _passwordService: PasswordService,
    @Inject(TMP_FILE_STORAGE_DI_TOKEN) private readonly _tmpFS: TmpFileStorage,
    @Inject(USER_FILE_STORAGE_DI_TOKEN) private readonly _userFS: UserFileStorage,
  ) {}

  async createUser(): Promise<UserId> {
    const generatedId = this._idService.generate();
    const { hashPassword } = await this._passwordService.generate({
      length: USER_MIN_LENGTH_PASSWORD,
      hash: true,
    });
    const nextUserIndex = await this._wr.getNextIndex();
    const createdUser = UserFactory.create({
      id: generatedId,
      username: `user${nextUserIndex}`,
      password: hashPassword,
      name: `User #${nextUserIndex}`,
    });

    await this._wr.save(createdUser);

    return createdUser.getId();
  }

  async registerUser(payload: RegisterUserPayload): Promise<UserId> {
    const generatedId = this._idService.generate();

    if (payload.password.length < USER_MIN_LENGTH_PASSWORD) {
      throw new BadRequestException('Password is invalid');
    }

    const hashedPassword = await this._passwordService.hash(payload.password);
    const createdUser = UserFactory.create({
      id: generatedId,
      username: payload.username,
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
      birthDate: payload.birthDate,
      region: payload.region,
    });

    await this._wr.save(createdUser);

    return createdUser.getId();
  }

  async updateUser(id: string, payload: UpdateUserPayload): Promise<UserId> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    if (payload.name) {
      foundUser.updateName(payload.name);
    }

    if (payload.birthDate) {
      foundUser.updateBirthDate(payload.birthDate);
    }

    if (payload.region) {
      foundUser.updateRegion(payload.region);
    }
    if (payload.genres) {
      foundUser.updateGenres(payload.genres);
    }

    if (typeof payload.isPremium === 'boolean') {
      foundUser.updatePremiumStatus(payload.isPremium);
    }

    if (typeof payload.isBlocked === 'boolean') {
      foundUser.updateBlockedStatus(payload.isBlocked);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundUser.updatePublicStatus(payload.isPublic);
    }

    await this._wr.save(foundUser);

    return foundUser.getId();
  }

  async updateUserUsername(id: string, username: string): Promise<UserId> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    if (foundUser.getUsername().value === username) {
      throw new BadRequestException('User already has this username');
    }

    const existsUserId = await this._wr.existsByUsername(username);

    if (existsUserId) {
      throw new DuplicationException(`The user with this username already exist`);
    }

    foundUser.updateUsername(username);

    await this._wr.save(foundUser);

    return foundUser.getId();
  }

  async updateUserEmail(id: string, email: string): Promise<UserId> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    if (foundUser.getEmail()?.value === email) {
      throw new BadRequestException('User already has this email');
    }

    const existsUserId = await this._wr.existsByEmail(email);

    if (existsUserId) {
      throw new DuplicationException(`The user with this email already exist`);
    }

    foundUser.updateEmail(email);

    await this._wr.save(foundUser);

    return foundUser.getId();
  }

  async updateUserPassword(id: string, payload: UpdateUserPasswordPayload): Promise<UserId> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    const isValidPassword = await this._passwordService.validate(
      payload.password,
      foundUser.getPassword(),
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('The password is incorrect');
    }

    if (payload.newPassword.length < USER_MIN_LENGTH_PASSWORD) {
      throw new BadRequestException('Password is invalid');
    }

    const hashedNewPassword = await this._passwordService.hash(payload.newPassword);

    foundUser.updatePassword(hashedNewPassword);

    await this._wr.save(foundUser);

    return foundUser.getId();
  }

  async refreshUserPassword(id: string): Promise<{ id: UserId; password: string }> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    const { password, hashPassword } = await this._passwordService.generate({
      length: USER_MIN_LENGTH_PASSWORD,
      hash: true,
    });

    foundUser.updatePassword(hashPassword);

    await this._wr.save(foundUser);

    return { id: foundUser.getId(), password };
  }

  async updateUserAvatar(id: string, payload: UpdateUserAvatarPayload): Promise<UserId> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    if (payload.fileId) {
      const uploadedFile = await this._tmpFS.findById(payload.fileId);

      if (!uploadedFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._userFS.saveUserAvatar(foundUser.getId(), uploadedFile);

      foundUser.updateAvatar(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundUser.updateColor(payload.color);
    }

    await this._wr.save(foundUser);

    return foundUser.getId();
  }

  async deleteUserAvatar(id: string): Promise<UserId> {
    const foundUser = await this._wr.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    foundUser.deleteAvatar();
    foundUser.deleteColor();
    await this._wr.save(foundUser);
    await this._userFS.deleteUserAvatar(foundUser.getId());

    return foundUser.getId();
  }

  async deleteUser(id: string): Promise<UserId> {
    const deletedUserId = await this._wr.deleteById(id);

    if (!deletedUserId) {
      throw new NotFoundException('User does not exist');
    }

    await this._userFS.deleteUserDirectory(deletedUserId);

    return deletedUserId;
  }

  async getUser(id: string, options?: Partial<{ isPublic: boolean }>): Promise<UserDTO | null> {
    const foundUser = await this._rr.findById(id, {
      isPublic: options?.isPublic,
    });

    return foundUser ? UserMapper.toDTO(foundUser) : null;
  }

  async verifyUserId(id: string): Promise<UserId | null> {
    return this._wr.existsById(id);
  }
}
