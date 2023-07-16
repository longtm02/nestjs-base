import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [path.join(`${__dirname}/**/entities/*.entity.{ts,js}`)],
  migrationsRun: true,
  migrationsTransactionMode: 'each',
  migrations: [path.join(`${__dirname}/**/migrations/*.{ts,js}`)],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
