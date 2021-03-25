import * as env from 'env-var'
import { parsePostgresUrl } from 'pg-god';

const DB_NAME: string = env.get('DB_NAME').required().asString();
const DB_URL: string = env.get('DB_URL').required().asString();
const API_PORT: number = env.get('API_PORT').required().asIntPositive();
const API_HOST: string = env.get('API_HOST').required().asString();
const ENTITIES_FOLDER: string = 'src/entities';

const db: any = {
    user: env.get('DB_USER').required().asString(),
    password: env.get('DB_PASS').required().asString(),
    host: env.get('DB_HOST').required().asString(),
    port: env.get('DB_PORT').required().asIntPositive(),
    database: 'postgres'
};

export { DB_NAME, DB_URL, ENTITIES_FOLDER, db, API_PORT, API_HOST};