import { IsArray, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";
import { EnumString } from "src/commons/helpers/enumToString";


export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    country: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(10)
    telephone: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(1)
    typeDocument: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    document: string;

    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid roles value,  ${EnumString(AppRoles)} `
    })
    roles: string[];

}

