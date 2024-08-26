import { AppRoutes } from './routes'
import Server from './server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  new Server({
    port: 3000 | 3001,
    routes: AppRoutes.routes,
  })
}

void main()
