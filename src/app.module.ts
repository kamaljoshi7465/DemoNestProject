import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { DogsModule } from './dogs/dogs.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CatsModule, AuthModule, DogsModule, UserModule, PrismaModule, UserModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}