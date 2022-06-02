import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";


function typeOrmMOduleOptions(): TypeOrmModuleOptions{
    return{
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.PUERTO, 10),
        username:'fersama',
        password: process.env.PASSWORD,
        database: process.env.DBNAME,
        entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
        autoLoadEntities: true,

       migrationsRun: true,
       migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
       migrationsTableName: 'migrations_typeorm', //aqui se genera una tabla con el historial de migraciones
       cli: {
       migrationsDir: 'src/migration',
       },
    
        synchronize: false,
        logging: true,
        logger: 'file',
    }
}

export default registerAs('database', () =>({
    config: typeOrmMOduleOptions()
}));