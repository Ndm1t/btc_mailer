import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "nestjs-pino";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix("/api");
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
