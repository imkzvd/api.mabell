import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DeleteAdminRefreshTokenHandler } from '../../../../../core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.handler';
import { AdminTokenService } from '../../../../../core/app/components/admin-token/admin-token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';
import { ValidateRefreshTokenHandler } from '../../../../../core/app/cqrs/token/queries/validate-refresh-token/validate-refresh-token.handler';

@Module({
  imports: [JWTModule],
  providers: [AdminTokenService, DeleteAdminRefreshTokenHandler, ValidateRefreshTokenHandler],
  controllers: [SessionController],
})
export class SessionModule {}
