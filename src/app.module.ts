import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/models/board/board.entity';
import { BoardModule } from 'src/models/board/board.module';
import { TaskEntity } from 'src/models/task/task.entity';
import { TaskModule } from 'src/models/task/task.module';
import { UserEntity } from 'src/models/user/user.entity';
import { UserModule } from 'src/models/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [BoardEntity, UserEntity, TaskEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BoardModule,
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
