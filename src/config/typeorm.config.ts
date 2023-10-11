import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getDatabaseDataSourceOptions = ({
  url
}): DataSourceOptions => {
  return {
    type: 'mongodb',
    url,
    entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  };
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/node-test',
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  synchronize: true,
};

// This is used by TypeORM migration scripts
export const DatabaseSource = new DataSource({
  ...getDatabaseDataSourceOptions(typeOrmConfig as undefined),
});
