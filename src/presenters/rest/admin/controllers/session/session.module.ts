import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DeleteRefreshTokenHandler } from '../../../../../core/app/cqrs/token/commands/delete-refresh-token/delete-refresh-token.handler';
import { TokenService } from '../../../../../core/app/components/token/token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';

@Module({
  imports: [JWTModule],
  providers: [TokenService, DeleteRefreshTokenHandler],
  controllers: [SessionController],
})
export class SessionModule {}
