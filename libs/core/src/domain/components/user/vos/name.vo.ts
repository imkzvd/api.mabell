import { BadRequestException } from '../../../../shared/exceptions';

export class NameVO {
  private constructor(public readonly value: string) {
    if (value.length < 3 || value.length > 30) {
      throw new BadRequestException('Name must be between 3 and 30 characters.');
    }
  }

  static create(username: string): NameVO {
    return new NameVO(username.trim());
  }
}
