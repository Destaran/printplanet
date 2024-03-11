import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSourceConfig } from './data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          ...appDataSourceConfig,
          host: config.getOrThrow<string>('POSTGRES_HOST'),
          port: parseInt(config.get<string>('POSTGRES_PORT', '6543'), 10),
          username: config.getOrThrow<string>('POSTGRES_USER'),
          password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
          database: config.getOrThrow<string>('POSTGRES_DATABASE'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
