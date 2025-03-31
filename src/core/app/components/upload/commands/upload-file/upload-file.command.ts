import { Command } from '@nestjs/cqrs';

export class UploadFileCommand extends Command<{ id: string }> {
  constructor(public readonly file: Express.Multer.File) {
    super();
  }
}
