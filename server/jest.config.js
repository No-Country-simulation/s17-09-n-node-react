module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'], // Ejecuta solo archivos de prueba TypeScript
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Asegúrate de usar ts-jest para compilar archivos .ts
  },
  testPathIgnorePatterns: ['dist/'], // Ignora la carpeta dist
}
