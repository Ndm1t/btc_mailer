import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { EmailService } from "../email/email.service";
import { MailService } from "../mail/mail.service";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Gauge } from "prom-client";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RateService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
    private readonly mailService: MailService,
    @InjectMetric("exchange_rate_gauge")
    public exchangeGauge: Gauge<string>,
    private readonly httpService: HttpService,
  ) {}

  private async getRateFromApi(): Promise<number> {
    let btcToUahData: Record<string, any>;
    try {
      btcToUahData = await firstValueFrom(
        this.httpService
          .get("https://btc-trade.com.ua/api/ticker/btc_uah")
          .pipe(),
      );
      return parseInt(btcToUahData.data.btc_uah.sell);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Invalid status value",
        },
        HttpStatus.BAD_REQUEST,
        { cause: "Invalid status value" },
      );
    }
  }

  async getRate() {
    const currentRate = await this.getRateFromApi();

    await this.databaseService.rate.create({ data: { currentRate } });

    this.exchangeGauge.set(currentRate);
    return currentRate;
  }

  async sendEmails() {
    const currentRate = await this.getRateFromApi();
    const emails = await this.emailService.findSubscribed();
    const sentEmails = await this.mailService.sendSubscribersCurrencyRate(
      emails,
      currentRate,
    );
    return {
      message: "Rate sent to active subscriptions",
      emails: sentEmails,
    };
  }
}
