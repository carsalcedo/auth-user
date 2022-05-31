import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from "nest-access-control";
import { JwtAuthGuard } from "src/auth/guards";


export function Auth(...roles: Role[]) {
    return applyDecorators(
        UseGuards(JwtAuthGuard, ACGuard), //ACGuard proteja la ruta para que solo pueda ser usada por el usuario designado 
        UseRoles(...roles),
        ApiBearerAuth()
    )
}