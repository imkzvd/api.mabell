import { BadRequestException } from '../../../shared/exceptions';

export class HexColorVO {
  private constructor(public readonly value: string) {
    if (!this.isValid(value)) {
      throw new BadRequestException('Invalid hex color');
    }
  }

  static create(value: string): HexColorVO {
    return new HexColorVO(value.trim());
  }

  private isValid(value: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(value);
  }
}
