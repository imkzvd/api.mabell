import { Region, Regions } from '../constants/regions';
import { BadRequestException } from '../../../shared/exceptions';

export class RegionVO {
  private constructor(public readonly value: Region) {}

  static create(role: string): RegionVO {
    if (!(Object.values(Regions) as string[]).includes(role)) {
      throw new BadRequestException('Invalid region');
    }

    return new RegionVO(role as Region);
  }
}
