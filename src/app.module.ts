import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmailModule } from "./email/email.module";
import { RateModule } from "./rate/rate.module";
import { MailModule } from "./mail/mail.module";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { DatabaseModule } from "./database/database.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskModule } from "./task/task.module";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
        },
      },
    }),
    EmailModule,
    RateModule,
    MailModule,
    DatabaseModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
