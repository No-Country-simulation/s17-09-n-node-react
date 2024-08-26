import App from './app'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  const app = new App().start()
  // eslint-disable-next-line no-console
  app.listen(3000, () => console.log('Listening on port 3000'))
}

void main()
