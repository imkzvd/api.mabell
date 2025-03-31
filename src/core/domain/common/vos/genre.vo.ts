import { Genre, Genres } from '../constants/genres';
import { BadRequestException } from '../../../shared/exceptions';

export class GenreVO {
  private constructor(public readonly value: Genre) {}

  static create(role: string): GenreVO {
    if (!(Object.values(Genres) as string[]).includes(role)) {
      throw new BadRequestException('Invalid genre');
    }

    return new GenreVO(role as Genre);
  }
}
