import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { createConnection, Connection } from 'typeorm';

import { ConfigService } from '../shared/services/config.service';
import { SharedModule } from '../shared/shared.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.db.host,
        port: configService.db.port,
        username: configService.db.user,
        password: configService.db.pass,
        database: configService.db.name,
        entities: [join(__dirname + '/**/models/*.entity{.ts,.js}')],
        logging: false,
        synchronize: false,
        migrationsRun: true,
        migrations: [
          __dirname + '/**/migrations/*{.ts,.js}',
          __dirname + '/**/seedings/*{.ts,.js}',
        ],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  public async runMigrations(configService: ConfigService) {
    const connection: Connection = await createConnection({
      type: 'postgres',
      host: configService.db.host,
      port: configService.db.port,
      username: configService.db.user,
      password: configService.db.pass,
      database: configService.db.name,
    });
    return connection.runMigrations({ transaction: 'each' });
  }
}
