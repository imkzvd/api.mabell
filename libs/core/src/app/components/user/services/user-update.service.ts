import {
  BadRequestException,
  DuplicationException,
  NotFoundException,
  UnauthorizedException,
} from '@core/shared/exceptions';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { UserBlockedEvent } from '@core/app/common/events/user-blocked.event';
import { UserUnblockedEvent } from '@core/app/common/events/user-unblocked.event';
import { UserUpdatedEvent } from '@core/app/common/events/user-updated.event';
import { UserEmailUpdatedEvent } from '@core/app/common/events/user-email-updated.event';
import { UserPasswordUpdatedEvent } from '@core/app/common/events/user-password-updated.event';
import { USER_MIN_LENGTH_PASSWORD } from '../constants';
import { UpdateUserAvatarPayload, UpdateUserPasswordPayload, UpdateUserPayload } from '../types';

export class UserUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _passwordService: PasswordService,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _userFS: UserFileStorage,
  ) {}

  async update(id: string, payload: UpdateUserPayload): Promise<UserId> {
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

  async updateUsername(id: string, username: string): Promise<UserId> {
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

  async updateEmail(id: string, email: string): Promise<UserId> {
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

  async updatePassword(id: string, payload: UpdateUserPasswordPayload): Promise<UserId> {
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

  async refreshPassword(id: string): Promise<{ id: UserId; password: string }> {
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

  async updateAvatar(id: string, payload: UpdateUserAvatarPayload): Promise<UserId> {
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

  async deleteAvatar(id: string): Promise<UserId> {
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
}
