import { RolesBuilder } from "nest-access-control";

export enum AppRoles{
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN'
}

export enum AppResources{
    USER = 'USER'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    //AUTHOR Roles
    .grant(AppRoles.AUTHOR)
    .createOwn([AppResources.USER])
    .updateOwn([AppResources.USER])
    .deleteOwn([AppResources.USER])
    
    
    //ADMIN Roles
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .createAny([AppResources.USER])
    .updateAny([AppResources.USER])
    .deleteAny([AppResources.USER]);

    //quede en minuto 2:49:00