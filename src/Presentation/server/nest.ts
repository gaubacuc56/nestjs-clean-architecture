import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from "@Domain/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api")
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Example API')
        .setDescription('Example API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, documentFactory, {
        swaggerOptions: {
        }
    });

    await app.listen(config.PORT);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
