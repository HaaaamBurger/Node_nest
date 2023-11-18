import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"
import { CustomConfigService } from "./config.service";
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        "environments/.env"
      ],
      load: [configuration]
    })
  ],
  providers: [ ConfigModule, CustomConfigService ],
  exports: [ ConfigModule, CustomConfigService ]
})
export class CustomConfigModule {}