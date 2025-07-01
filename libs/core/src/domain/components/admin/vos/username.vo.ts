import { BadRequestException } from '@core/shared/exceptions';

export class UsernameVO {
  private constructor(public readonly value: string) {
    if (value.length < 3 || value.length > 10) {
      throw new BadRequestException('Username must be between 3 and 10 characters.');
    }
  }

  static create(username: string): UsernameVO {
    return new UsernameVO(username.trim().toLowerCase());
  }
}
