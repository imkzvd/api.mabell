import { Query } from '../../../../types';

export class GetArtistPublicStatusQuery extends Query<boolean> {
  constructor(public readonly id: string) {
    super();
  }
}
