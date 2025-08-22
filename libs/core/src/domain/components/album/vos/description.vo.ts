import { BadRequestException } from '../../../../shared/exceptions';

export class DescriptionVO {
  private constructor(public readonly value: string) {
    if (value.length > 500) {
      throw new BadRequestException('Description max length - 500.');
    }
  }

  static create(value: string): DescriptionVO {
    return new DescriptionVO(value.trim());
  }
}
