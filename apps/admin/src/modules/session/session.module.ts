import { Module } from '@nestjs/common';
import { JWTModule } from '@infrastructure/jwt';
import { DeleteAdminRefreshTokenByIdHandler } from './commands/delete-admin-refresh-token-by-id.handler';
import { adminTokenServiceProvider } from '../../providers/admin-token-service.provider';
import { SessionController } from './session.controller';

@Module({
  imports: [JWTModule],
  providers: [adminTokenServiceProvider, DeleteAdminRefreshTokenByIdHandler],
  controllers: [SessionController],
})
export class SessionModule {}
