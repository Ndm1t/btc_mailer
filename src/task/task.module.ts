import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { MailModule } from "../mail/mail.module";
import { RateModule } from "../rate/rate.module";
import { EmailModule } from "../email/email.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [MailModule, RateModule, EmailModule, DatabaseModule],
  providers: [TaskService],
})
export class TaskModule {}
