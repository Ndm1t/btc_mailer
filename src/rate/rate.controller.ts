import { Controller, Get, Post } from "@nestjs/common";
import { RateService } from "./rate.service";

@Controller("/rate")
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  async getCurrency() {
    return await this.rateService.getRate();
  }

  @Post()
  async sendCurrentRate() {
    return await this.rateService.sendEmails();
  }
}
