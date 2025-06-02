import { BadRequestException } from '../../../../shared/exceptions';

export class BiographyVO {
  private constructor(public readonly value: string) {
    if (value.length > 500) {
      throw new BadRequestException('Biography max length - 500.');
    }
  }

  static create(value: string): BiographyVO {
    return new BiographyVO(value.trim());
  }
}
