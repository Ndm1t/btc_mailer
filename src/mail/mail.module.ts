import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {
  makeCounterProvider,
  PrometheusModule,
} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    PrometheusModule,
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    MailService,
    makeCounterProvider({
      name: "send_email_count",
      help: "Total count of sent emails",
    }),
    makeCounterProvider({
      name: "send_email_error_count",
      help: "Total count of failed sent emails",
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
