import { BadRequestException } from '@core/shared/exceptions';

export class BirthDateVO {
  private constructor(public readonly value: Date) {
    if (new Date(value) >= new Date()) {
      throw new BadRequestException('Birth date is invalid.');
    }
  }

  static create(value: Date): BirthDateVO {
    return new BirthDateVO(value);
  }
}
