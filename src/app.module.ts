import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkModule } from './work/work.module';
import { CategoryModule } from './category/category.module';
import { FieldModule } from './field/field.module';
import { WorkFieldModule } from './work-field/work-field.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserModule,
    WorkModule,
    CategoryModule,
    FieldModule,
    WorkFieldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
