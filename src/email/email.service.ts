import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";

@Injectable()
export class EmailService {
  constructor(
    @InjectMetric("subscribe_email_count")
    public subscribedCounter: Counter<string>,
    @InjectMetric("unsubscribe_email_count")
    public unsubscribedCounter: Counter<string>,
    private databaseService: DatabaseService,
  ) {}

  async findAll() {
    return this.databaseService.email.findMany();
  }

  async create(createEmailDto: Prisma.EmailCreateInput) {
    const existingEmail = await this.databaseService.email.findUnique({
      where: { email: createEmailDto.email },
    });
    if (existingEmail) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "E-mail already exists",
        },
        HttpStatus.CONFLICT,
      );
    }
    this.subscribedCounter.inc();
    return this.databaseService.email.create({ data: createEmailDto });
  }

  async delete(unsubscribeDto: Prisma.EmailCreateInput) {
    const existingEmail = await this.databaseService.email.findUnique({
      where: { email: unsubscribeDto.email },
    });
    if (!existingEmail) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "there is no such an email",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: "not found",
        },
      );
    }
    this.unsubscribedCounter.inc();
    existingEmail.status = "unsubscribed";
    existingEmail.deletedAt = new Date();
    return this.databaseService.email.update({
      where: { email: existingEmail.email },
      data: existingEmail,
    });
  }

  async findSubscribed() {
    try {
      const emailObjects = await this.databaseService.email.findMany({
        where: { status: "subscribed" },
        select: {
          email: true,
        },
      });
      return emailObjects.map((email) => email.email);
    } catch (e) {
      return e;
    }
  }
}
