import { Injectable, Logger } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { RateService } from "../rate/rate.service";
import { EmailService } from "../email/email.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DatabaseService } from "../database/database.service";
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private readonly mailService: MailService,
    private readonly rateService: RateService,
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM, {
    timeZone: "Europe/Kyiv",
  })
  async sendDailyReport() {
    await this.rateService.sendEmails();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async sendRateChangeEmail() {
    const currentRate = await this.rateService.getRateFromApi();
    const lastRate = await this.databaseService.rate.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (lastRate.currentRate * 1.05 < currentRate) {
      const emails = await this.emailService.findSubscribed();

      await this.mailService.sendSubscribersCurrencyRate(
        emails,
        lastRate.currentRate,
      );
      this.logger.log("The exchange rate changes was sent to the subscribers");
    } else {
      this.logger.log("The exchange rate did not change");
    }
  }
}
