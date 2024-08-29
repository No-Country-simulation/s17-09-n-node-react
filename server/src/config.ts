import * as env from 'env-var'

export const config = {
  nodeEnv: env.get('NODE_ENV').required().asString(),
  jwtAccessSecret: env.get('JWT_ACCESS_SECRET').required().asString(),
  jwtRefreshSecret: env.get('JWT_REFRESH_SECRET').required().asString(),
}
