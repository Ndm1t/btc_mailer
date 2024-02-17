import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import {
  makeCounterProvider,
  PrometheusModule,
} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [PrometheusModule],
  controllers: [EmailController],
  providers: [
    EmailService,
    makeCounterProvider({
      name: "subscribe_email_count",
      help: "Total count of subscribe operations",
    }),
    makeCounterProvider({
      name: "unsubscribe_email_count",
      help: "Total count of unsubscribe operations",
    }),
  ],
  exports: [EmailService],
})
export class EmailModule {}
