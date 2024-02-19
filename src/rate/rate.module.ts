import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { RateService } from "./rate.service";
import { RateController } from "./rate.controller";
import { EmailModule } from "../email/email.module";
import { MailModule } from "../mail/mail.module";
import {
  makeGaugeProvider,
  PrometheusModule,
} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [PrometheusModule, HttpModule, EmailModule, MailModule],
  controllers: [RateController],
  providers: [
    RateService,
    makeGaugeProvider({
      name: "exchange_rate_gauge",
      help: "Gauge of the requested exchange rates from the service",
    }),
  ],
  exports: [RateService],
})
export class RateModule {}
