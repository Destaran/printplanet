import 'reflect-metadata';
import { appDataSourceConfig } from 'src/data-source';
import { DataSource } from 'typeorm';

export const seederConfig = {
  ...appDataSourceConfig,
  entities: ['src/**/*.entity.ts'],
  host: 'localhost',
  database: 'pp-dev',
  username: 'postgres',
  password: 'mysecretpassword',
};

export default new DataSource(seederConfig);
