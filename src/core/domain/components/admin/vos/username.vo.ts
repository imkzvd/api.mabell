import { BadRequestException } from '../../../../shared/exceptions';

export class UsernameVO {
  private constructor(public readonly value: string) {
    if (value.length < 3 || value.length > 10) {
      throw new BadRequestException('Username must be between 3 and 10 characters.');
    }

    if (value === 'owner') {
      throw new BadRequestException('We can not use this username');
    }
  }

  static create(username: string): UsernameVO {
    return new UsernameVO(username.trim().toLowerCase());
  }
}
