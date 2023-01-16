import { EnvConfig } from 'src/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import { ConfigModuleOptions } from './config.module';

const dotenv = require('dotenv');

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigModuleOptions) {
    const configPath = require('path').resolve(
      __dirname,
      '../../src',
      options.folder,
      `.env.${process.env.NODE_ENV || 'development'}`,
    );
    const { parsed } = dotenv.config({
      path: configPath,
    });
    this.envConfig = parsed as EnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
