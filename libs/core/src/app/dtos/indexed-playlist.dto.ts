import { IndexedSimplifiedUserDTO } from './indexed-simplified-user.dto';

export class IndexedPlaylistDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly owner: IndexedSimplifiedUserDTO,
    public readonly cover: string | null,
  ) {}
}
