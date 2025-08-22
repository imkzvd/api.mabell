import { BadRequestException } from '../../../shared/exceptions';

export class EmailVO {
  private constructor(public readonly value: string) {
    if (!this.isValid(value)) {
      throw new BadRequestException('Invalid email');
    }
  }

  static create(email: string): EmailVO {
    return new EmailVO(email.trim());
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
