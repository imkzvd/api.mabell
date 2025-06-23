import { BadRequestException } from '@core/shared/exceptions';

export class DurationVO {
  private constructor(public readonly value: number) {
    if (value <= 0 || value > 5000) {
      throw new BadRequestException('Duration is invalid.');
    }
  }

  static create(value: number): DurationVO {
    return new DurationVO(value);
  }
}
