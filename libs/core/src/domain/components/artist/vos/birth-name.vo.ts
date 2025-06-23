import { BadRequestException } from '@core/shared/exceptions';

export class BirthNameVO {
  private constructor(public readonly value: string) {
    if (value.length < 10 || value.length > 100) {
      throw new BadRequestException('Birth name must be between 10 and 100 characters.');
    }
  }

  static create(value: string): BirthNameVO {
    return new BirthNameVO(value.trim());
  }
}
