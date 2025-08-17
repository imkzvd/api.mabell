import { BadRequestException } from '../../../../shared/exceptions';

export class NameVO {
  private constructor(public readonly value: string) {
    if (value.length < 1 || value.length > 50) {
      throw new BadRequestException('Name must be between 3 and 30 characters.');
    }
  }

  static create(value: string): NameVO {
    return new NameVO(value.trim());
  }
}
