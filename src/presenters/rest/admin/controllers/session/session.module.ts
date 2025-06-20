import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DeleteAdminRefreshTokenHandler } from '../../../../../core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.handler';
import { AdminTokenService } from '../../../../../core/app/components/admin-token/admin-token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';

@Module({
  imports: [JWTModule],
  providers: [AdminTokenService, DeleteAdminRefreshTokenHandler],
  controllers: [SessionController],
})
export class SessionModule {}
