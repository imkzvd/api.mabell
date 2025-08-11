import { Types } from 'mongoose';
import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@api.mabell/core';

export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
