import { ConfigService } from "@nestjs/config"
import { TYPEORM_CONFIG } from "src/config/constants";
import fs = require('fs')



const generateTypeormConfigFile = (config: ConfigService) => {
    const typeromConfig = config.get(TYPEORM_CONFIG);
    fs.writeFileSync('ormconfig.json',
    JSON.stringify(typeromConfig, null, 2));
}

export default generateTypeormConfigFile