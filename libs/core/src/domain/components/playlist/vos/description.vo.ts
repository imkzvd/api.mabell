import { BadRequestException } from '@core/shared/exceptions';

export class DescriptionVO {
  private constructor(public readonly value: string) {
    if (value.length > 100) {
      throw new BadRequestException('Description max length - 200.');
    }
  }

  static create(value: string): DescriptionVO {
    return new DescriptionVO(value.trim());
  }
}
