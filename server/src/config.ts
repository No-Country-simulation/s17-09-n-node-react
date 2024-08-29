import env from 'env-var'

export const envs = {
  nodeEnv: env.get('NODE_ENV').required().asString(),
  port: env.get('PORT').asPortNumber(),
  clientUrl: env.get('CLIENT_URL').asUrlString(),
  jwtAccessSecret: env.get('JWT_ACCESS_SECRET').asString(),
  jwtRefreshSecret: env.get('JWT_REFRESH_SECRET').asString(),
}
