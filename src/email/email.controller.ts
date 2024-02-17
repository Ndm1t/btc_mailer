import { Controller, Get, Body, Post, Delete } from "@nestjs/common";
import { EmailService } from "./email.service";
import { Prisma } from "@prisma/client";

@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async list(): Promise<Prisma.EmailCreateInput[]> {
    return this.emailService.findAll();
  }
  @Post()
  async subscribe(@Body() createEmailDto: Prisma.EmailCreateInput) {
    return await this.emailService.create(createEmailDto);
  }
  @Delete()
  async unsubscribe(@Body() deleteEmailDto: Prisma.EmailCreateInput) {
    return await this.emailService.delete(deleteEmailDto);
  }
}
