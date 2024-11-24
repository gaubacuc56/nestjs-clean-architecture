import { DataSource } from "typeorm";

import { TypeOrmConfig } from "./orm-config";

export const dataSource = new DataSource(TypeOrmConfig);
