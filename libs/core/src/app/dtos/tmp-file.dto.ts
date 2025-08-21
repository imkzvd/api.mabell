import { TmpFileId } from '../ports';

export class TmpFileDTO {
  constructor(
    public readonly id: TmpFileId,
    public readonly name: string,
    public readonly originalName: string,
    public readonly fullPath: string,
    public readonly path: string,
    public readonly size: number,
    public readonly type: string,
    public readonly uploadedAt: Date,
    public readonly expiresAt: Date,
  ) {}
}
