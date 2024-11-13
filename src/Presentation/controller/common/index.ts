import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Health")
@Controller("health")
export class CommonController {
    @Get("")
    getHello(): string {
        return "App is running";
    }
}
