import env from 'env-var'

export const envs = {
  nodeEnv: env.get('NODE_ENV').required().asString(),
  port: env.get('PORT').asPortNumber(),
  jwtCookieName: env.get('JWT_COOKIE_NAME').asString(),
  clientUrl: env.get('CLIENT_URL').asUrlString(),
  jwtAccessSecret: env.get('JWT_ACCESS_SECRET').asString(),
  jwtAccessExpiration: env.get('JWT_ACCESS_EXPIRATION').asString(),
  jwtRefreshSecret: env.get('JWT_REFRESH_SECRET').asString(),
  jwtRefreshExpiration: env.get('JWT_REFRESH_EXPIRATION').asString(),
  openAIApiKey: env.get('OPENAI_API_KEY').asString(),
  openAIAssistantId: env.get('OPEN_AI_ASSISTANT_ID').asString(),
}
