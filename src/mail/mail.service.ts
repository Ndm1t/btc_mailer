import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    private readonly mailerService: MailerService,
    @InjectMetric("send_email_count") public sentCounter: Counter<string>,
    @InjectMetric("send_email_error_count")
    public failedCounter: Counter<string>,
  ) {}

  async sendSubscribersCurrencyRate(
    emails: string[],
    rate: number,
  ): Promise<string[]> {
    const sentEmails: string[] = [];
    const emailPromises = emails.map(async (email) => {
      try {
        await this.mailerService.sendMail({
          to: email,
          subject: "Your BTC to UAH rate report",
          template: "./exchange-rate",
          context: {
            rate,
          },
        });
        sentEmails.push(email);
        this.sentCounter.inc();
      } catch (e) {
        this.failedCounter.inc();
        this.logger.error(`Couldn't sent email to ${email}`, e.message);
      }
    });
    await Promise.all(emailPromises);
    return sentEmails;
  }
}
