import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { CommandBus } from '@nestjs/cqrs';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { config } from "@Domain/config";

import { AppModule } from "./app.module";

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const commandBus = app.get(CommandBus);
    app.setGlobalPrefix("api");
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const swaggerConfig = new DocumentBuilder()
        .setTitle("Example API")
        .setDescription("Example API description")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const documentFactory = () =>
        SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, documentFactory, {
        swaggerOptions: {},
    });

    await app.listen(config.PORT);
    console.log(`Server is running on http://localhost:${config.PORT}/api`);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
