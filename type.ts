import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ParameterizedContext } from 'koa'
import { IResolverObject } from 'graphql-tools'
import { Redis, RedisOptions } from 'ioredis'
import * as utils from './src/utils'
import { Exception } from './lib/error'
import { models, contextOption } from './db'

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface Dictionary<T> {
  [index: string]: T;
}

export interface NumericDictionary<T> {
  [index: number]: T;
}

export type Many<T> = T | Readonly<T[]>;

export type Models = typeof models;

export interface ProjectConfig {
  salt: string;
  jwtSecret: string;
  sentryDSN: string;
  [key: string]: any;
};

export interface ConsulConfig {
  db: SequelizeOptions;
  redis: RedisOptions;
};

// type of config/config.json
export type AppConfig = ConsulConfig & ProjectConfig;

export type UserRole = 'ADMIN' | 'USER';

export interface UserContext {
  id: number;
  role: UserRole;
  exp: number;
};

export interface AppContext {
  sequelize: Sequelize;
  contextOption: typeof contextOption;
  models: Models;
  config: AppConfig;
  utils: typeof utils;
  redis: Redis;
  user?: UserContext;
  Exception: typeof Exception;
};

export interface KoaContext extends ParameterizedContext {
  user?: UserContext;
  requestId: string;
};

type ResolverModel<T> = IResolverObject<T, Required<AppContext>>

export type SequelizeResolverObject = {
  // [key in keyof typeof models]?: IResolverObject<models[key], AppContext>
  User?: ResolverModel<models.User>;
  Todo?: ResolverModel<models.Todo>;
} & IResolverObject<any, Required<AppContext>>
