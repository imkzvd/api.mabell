import { Query } from '@core/app/types';

export class GetArtistPublicStatusQuery extends Query<boolean> {
  constructor(public readonly id: string) {
    super();
  }
}
