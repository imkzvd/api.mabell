import { BadRequestException } from '../../../../shared/exceptions';

export class NameVO {
  private constructor(public readonly value: string) {
    if (value.length < 1 || value.length > 30) {
      throw new BadRequestException('Name must be between 1 and 30 characters.');
    }
  }

  static create(value: string): NameVO {
    return new NameVO(value.trim());
  }
}
