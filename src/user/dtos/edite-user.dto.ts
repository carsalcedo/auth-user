import { PartialType } from "@nestjs/swagger"; //convierte las propiedades de una clase a opcionales
import { CreateUserDto } from "./create-user.dto";


export class EditeUserDto extends PartialType(CreateUserDto) {}
