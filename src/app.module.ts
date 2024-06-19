import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        console.log(process.env.REDIS_HOST);
        console.log(process.env.REDIS_PORT);

        return {
          store: await redisStore({
            socket: {
              host: process.env.REDIS_HOST,
              port: +process.env.REDIS_PORT,
            },
          }),
        };
      },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
