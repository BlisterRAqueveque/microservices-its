import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

interface EnvVars {
  PORT: number;
  USER_MS_PORT: number;
  USER_MS_HOST: string;
  PRODUCT_MS_PORT: number;
  PRODUCT_MS_HOST: string;
  SEED: string;
  ATTACH_MS_PORT: number;
  ATTACH_MS_HOST: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    USER_MS_PORT: joi.number().required(),
    USER_MS_HOST: joi.string().required(),
    PRODUCT_MS_PORT: joi.number().required(),
    PRODUCT_MS_HOST: joi.string().required(),
    SEED: joi.string().required(),
    ATTACH_MS_PORT: joi.number().required(),
    ATTACH_MS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  USER_MS_PORT: envVars.USER_MS_PORT,
  USER_MS_HOST: envVars.USER_MS_HOST,
  PRODUCT_MS_PORT: envVars.PRODUCT_MS_PORT,
  PRODUCT_MS_HOST: envVars.PRODUCT_MS_HOST,
  SEED: envVars.SEED,
  ATTACH_MS_PORT: envVars.ATTACH_MS_PORT,
  ATTACH_MS_HOST: envVars.ATTACH_MS_HOST,
};
