import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log("Successfully connected to database");
  }
}
