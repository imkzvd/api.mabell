import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteRefreshTokenCommand } from './delete-refresh-token.command';
import { TokenService } from '../../../../components/token/token.service';

@CommandHandler(DeleteRefreshTokenCommand)
export class DeleteRefreshTokenHandler implements ICommandHandler<DeleteRefreshTokenCommand> {
  constructor(@Inject(TokenService) private readonly _tokenService: TokenService) {}

  async execute({ id }: DeleteRefreshTokenCommand) {
    return await this._tokenService.deleteRefreshToken(id);
  }
}
