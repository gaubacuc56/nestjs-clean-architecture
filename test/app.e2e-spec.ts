import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs'
import request from "supertest";
import { AppModule } from "../src/Infrastructure/server/app.module";
class LoginRequest {
    email: string;
    password: string;
}
describe("AppController (e2e)", () => {
    let app: INestApplication;
    let eventBus: EventBus

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, CqrsModule],
            exports: [CqrsModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        eventBus = moduleFixture.get<EventBus>(EventBus)
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/api/auth/login (POST)', async () => {
        const loginDto = new LoginRequest()
        loginDto.email = 'testuser@gmail.com'
        loginDto.password = 'password123'

        const response = await request(app.getHttpServer())
            .post('/auth/login') // Full path under your API
            .send(loginDto)

        expect(response.body).toHaveProperty('statusCode'); // Update assertions as per your response structure
    });
});
