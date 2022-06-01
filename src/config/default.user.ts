import { ConfigService } from "@nestjs/config";
import { User } from "src/user/entities";
import { getRepository } from "typeorm";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from "./constants";


export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User)

    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('email = :email', {email: config.get<string>('DEFAULT_USER_EMAIL')})
        .getOne()

        if (!defaultUser){
            const adminUser = userRepository.create({
                email: config.get<string>(DEFAULT_USER_EMAIL),
                password: config.get<string>(DEFAULT_USER_PASSWORD),
                roles: ['ADMIN']
            })

            return await userRepository.save(adminUser)
        }
}  //AQUI SE CREA UN USUARIO ADMIN POR DEFECTO PARA USO INICIAL DE LA APLICACION EN EL DEPLOY