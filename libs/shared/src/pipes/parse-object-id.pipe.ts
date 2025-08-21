import { Types } from 'mongoose';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
