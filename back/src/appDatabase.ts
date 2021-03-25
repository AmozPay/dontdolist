import {createConnection, Connection} from "typeorm";
import { Task } from "./entities/task"
import { createDatabase } from 'pg-god';
import { db, DB_NAME, ENTITIES_FOLDER } from "./appConfig";

const connectionParameters = {
    type: db.database,
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: DB_NAME,
    entities: [`${ENTITIES_FOLDER}/*.ts`],
    synchronize: true
}

export async function dbInitialize(): Promise<Connection> {
    try {
        return createConnection(connectionParameters);
    } catch (e) {
        if (e.code === '3D000') {
            await createDatabase({databaseName : DB_NAME}, connectionParameters);
            return dbInitialize();
        }
        throw e
    }
}