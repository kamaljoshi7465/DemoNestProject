import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [CatsModule, AuthModule, DogsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}