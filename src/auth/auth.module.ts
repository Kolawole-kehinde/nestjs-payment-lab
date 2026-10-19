import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.js";
import { RolesGuard } from "./roles.guard.js";


@Module({
    controllers: [AuthController],
    providers: [RolesGuard],
    exports: [RolesGuard]
})

export class AuthModule{}