import { BadRequestException } from '@core/shared/exceptions';

export class ReleaseDateVO {
  private constructor(public readonly value: Date) {
    if (new Date(value) >= new Date()) {
      throw new BadRequestException('Release date is invalid.');
    }
  }

  static create(value: Date): ReleaseDateVO {
    return new ReleaseDateVO(value);
  }
}
