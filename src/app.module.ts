import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { DogsModule } from './dogs/dogs.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [CatsModule, AuthModule, DogsModule, UserModule, PrismaModule, UserModule, BlogModule, PostModule, CommentModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}