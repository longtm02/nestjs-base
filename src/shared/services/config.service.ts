import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string;
}

export interface DBConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
}

export interface RmqConfig {
  url: string;
  name: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  url: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly validationScheme = {
    PORT: Joi.number().default(3000),
    BASE_PATH: Joi.string().default('/auth/').empty(''),

    JWT_SECRET: Joi.string().default('s@cret'),

    JWT_SECRET_CORE: Joi.string().default('s@cret'),

    LOG_LEVEL: Joi.string().default('debug'),

    REDIS_HOST: Joi.string().empty(''),
    REDIS_PORT: Joi.string().empty(''),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    RMQ_HOST: Joi.string().empty(''),
    RMQ_PORT: Joi.number().empty(''),
    RMQ_USER: Joi.string().empty(''),
    RMQ_PASS: Joi.string().empty(''),
    RMQ_PATH: Joi.string().empty(''),
    RMQ_NAME: Joi.string().empty(''),
    RMQ_SSL: Joi.string().empty(''),
  };

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }
  get basePath(): string {
    return String(this.envConfig.BASE_PATH);
  }

  get jwt() {
    return {
      accessTokenSecret: this.envConfig.JWT_SECRET,
      accessTokenExpireTime: this.envConfig.JWT_EXPIRATION_TIME,
    };
  }

  get jwtCore() {
    return {
      accessTokenSecret: this.envConfig.JWT_SECRET_CORE,
    };
  }

  get logLevel(): string {
    return String(this.envConfig.LOG_LEVEL);
  }

  get db(): DBConfig {
    return {
      host: String(this.envConfig.DB_HOST),
      port: Number(this.envConfig.DB_PORT),
      user: String(this.envConfig.DB_USER),
      pass: String(this.envConfig.DB_PASS),
      name: String(this.envConfig.DB_NAME),
    };
  }

  get redis(): RedisConfig {
    const url =
      'redis://' + this.envConfig.REDIS_HOST + ':' + this.envConfig.REDIS_PORT;
    return {
      host: String(this.envConfig.REDIS_HOST),
      port: Number(this.envConfig.REDIS_PORT),
      url,
    };
  }

  get rmq(): RmqConfig {
    if (!this.envConfig.RMQ_HOST) {
      return null;
    }
    const protocol = this.envConfig.RMQ_SSL === 'true' ? 'amqps' : 'amqp';
    let url = `${protocol}://`;
    if (this.envConfig.RMQ_USER) {
      url += this.envConfig.RMQ_USER;
      if (this.envConfig.RMQ_PASS) {
        url += `:${this.envConfig.RMQ_PASS}`;
      }
      url += '@';
    }
    url += `${this.envConfig.RMQ_HOST}`;
    if (this.envConfig.RMQ_PORT) {
      url += `:${this.envConfig.RMQ_PORT}`;
    }
    if (this.envConfig.RMQ_PATH) {
      url += `/${this.envConfig.RMQ_PATH}`;
    }

    return {
      url,
      name: String(this.envConfig.RMQ_NAME),
    };
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const validation = envVarsSchema.validate(envConfig);
    return validation.value;
  }
}
