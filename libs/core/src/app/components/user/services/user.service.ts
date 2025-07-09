import {
  BadRequestException,
  DuplicationException,
  NotFoundException,
  UnauthorizedException,
} from '@core/shared/exceptions';
import { UserFactory } from '@core/domain/components/user/user.factory';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserReadRepository } from '@core/domain/components/user/repository/user-read-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { USER_MIN_LENGTH_PASSWORD } from '../constants';
import { UserDTO } from '../dtos/user.dto';
import UserMapper from '../dtos/user.mapper';
import {
  RegisterUserPayload,
  UpdateUserAvatarPayload,
  UpdateUserPasswordPayload,
  UpdateUserPayload,
} from '../types';
import { IdService } from '../../../common/ports/id.service.port';
import { PasswordService } from '../../../common/ports/password-service.port';
import { UserFileStorage } from '../../../common/ports/file-storages/user-file-storage.port';
import { TmpFileStorage } from '../../../common/ports/file-storages/tmp-file-storage.port';
import { EventBus } from '../../../common/ports/event-bus.port';
import { UserCreatedEvent } from '../../../common/events/user-created.event';
import { UserRegisteredEvent } from '../../../common/events/user-registered.event';
import { UserUpdatedEvent } from '../../../common/events/user-updated.event';
import { UserDeletedEvent } from '../../../common/events/user-deleted.event';
import { UserEmailUpdatedEvent } from '../../../common/events/user-email-updated.event';
import { UserPasswordUpdatedEvent } from '../../../common/events/user-password-updated.event';
import { UserBlockedEvent } from '../../../common/events/user-blocked.event';
import { UserUnblockedEvent } from '../../../common/events/user-unblocked.event';

export class UserService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _RR: UserReadRepository,
    private readonly _idService: IdService<UserId>,
    private readonly _passwordService: PasswordService,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _userFS: UserFileStorage,
  ) {}

  async createUser(): Promise<UserId> {
    const generatedId = this._idService.generate();
    const { hashPassword } = await this._passwordService.generate({
      length: USER_MIN_LENGTH_PASSWORD,
      hash: true,
    });
    const nextUserIndex = await this._WR.getNextIndex();
    const createdUser = UserFactory.create({
      id: generatedId,
      username: `user${nextUserIndex}`,
      password: hashPassword,
      name: `User #${nextUserIndex}`,
    });

    await this._WR.save(createdUser);
    this._EB.publish(new UserCreatedEvent({ id: generatedId }));

    return generatedId;
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

    await this._WR.save(createdUser);
    this._EB.publish(new UserRegisteredEvent({ id: generatedId }));

    return generatedId;
  }

  async updateUser(id: string, payload: UpdateUserPayload): Promise<UserId> {
    const foundUser = await this._WR.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    if (payload.name) {
      foundUser.updateName(payload.name);
    }

    if (payload.birthDate !== undefined) {
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

      this._EB.publish(
        payload.isBlocked
          ? new UserBlockedEvent({ id: foundUser.getId() })
          : new UserUnblockedEvent({ id: foundUser.getId() }),
      );
    }

    await this._WR.save(foundUser);
    this._EB.publish(new UserUpdatedEvent({ id: foundUser.getId() }));

    return foundUser.getId();
  }

  async updateUserUsername(id: string, username: string): Promise<UserId> {
    const foundUser = await this._WR.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    if (foundUser.getUsername().value === username) {
      throw new BadRequestException('User already has this username');
    }

    const existsUserId = await this._WR.existsByUsername(username);

    if (existsUserId) {
      throw new DuplicationException(`The user with this username already exist`);
    }

    foundUser.updateUsername(username);

    await this._WR.save(foundUser);
    this._EB.publish(new UserUpdatedEvent({ id: foundUser.getId() }));

    return foundUser.getId();
  }

  async updateUserEmail(id: string, email: string): Promise<UserId> {
    const foundUser = await this._WR.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    if (foundUser.getEmail()?.value === email) {
      throw new BadRequestException('User already has this email');
    }

    const existsUserId = await this._WR.existsByEmail(email);

    if (existsUserId) {
      throw new DuplicationException(`The user with this email already exist`);
    }

    foundUser.updateEmail(email);

    await this._WR.save(foundUser);
    this._EB.publish(new UserEmailUpdatedEvent({ id: foundUser.getId() }));
    this._EB.publish(new UserUpdatedEvent({ id: foundUser.getId() }));

    return foundUser.getId();
  }

  async updateUserPassword(id: string, payload: UpdateUserPasswordPayload): Promise<UserId> {
    const foundUser = await this._WR.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    const isValidPassword = await this._passwordService.validate(
      payload.password,
      foundUser.getPassword().value,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('The password is incorrect');
    }

    if (payload.newPassword.length < USER_MIN_LENGTH_PASSWORD) {
      throw new BadRequestException('Password is invalid');
    }

    const hashedNewPassword = await this._passwordService.hash(payload.newPassword);

    foundUser.updatePassword(hashedNewPassword);

    await this._WR.save(foundUser);
    this._EB.publish(new UserPasswordUpdatedEvent({ id: foundUser.getId() }));

    return foundUser.getId();
  }

  async refreshUserPassword(id: string): Promise<{ id: UserId; password: string }> {
    const foundUser = await this._WR.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    const { password, hashPassword } = await this._passwordService.generate({
      length: USER_MIN_LENGTH_PASSWORD,
      hash: true,
    });

    foundUser.updatePassword(hashPassword);

    await this._WR.save(foundUser);
    this._EB.publish(new UserUpdatedEvent({ id: foundUser.getId() }));

    return { id: foundUser.getId(), password };
  }

  async updateUserAvatar(id: string, payload: UpdateUserAvatarPayload): Promise<UserId> {
    const foundUser = await this._WR.findById(id);

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

    await this._WR.save(foundUser);
    this._EB.publish(new UserUpdatedEvent({ id: foundUser.getId() }));

    return foundUser.getId();
  }

  async deleteUserAvatar(id: string): Promise<UserId> {
    const foundUser = await this._WR.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    foundUser.deleteAvatar();
    foundUser.deleteColor();
    await this._WR.save(foundUser);
    await this._userFS.deleteUserAvatar(foundUser.getId());
    this._EB.publish(new UserUpdatedEvent({ id: foundUser.getId() }));

    return foundUser.getId();
  }

  async deleteUser(id: string): Promise<UserId> {
    const deletedUserId = await this._WR.deleteById(id);

    if (!deletedUserId) {
      throw new NotFoundException('User does not exist');
    }

    await this._userFS.deleteUserDirectory(deletedUserId);
    this._EB.publish(new UserDeletedEvent({ id: deletedUserId }));

    return deletedUserId;
  }

  async getUser(id: string, options?: Partial<{ isPublic: boolean }>): Promise<UserDTO | null> {
    const foundUser = await this._RR.findById(id, {
      isPublic: options?.isPublic,
    });

    return foundUser ? UserMapper.toDTO(foundUser) : null;
  }

  async verifyUserId(id: string): Promise<UserId | null> {
    return this._WR.existsById(id);
  }
}
