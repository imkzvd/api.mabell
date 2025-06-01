import { Query } from '@nestjs/cqrs';

export class GetArtistPublicStatusQuery extends Query<boolean> {
  constructor(public readonly id: string) {
    super();
  }
}
