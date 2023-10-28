import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import * as path from "node:path";
@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: "postgres",
          host: customConfigService.db_host,
          port: customConfigService.db_port,
          username: customConfigService.db_username,
          password: customConfigService.db_password,
          database: customConfigService.db_database,
          synchronize: true,
          entities: [path.join(__dirname, "database", "**", "*.entity{.ts,.js}")],
        }
      },
      inject: [CustomConfigService],
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
