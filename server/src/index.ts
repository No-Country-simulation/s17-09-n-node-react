import createApp from './app'

async function main (): Promise<void> {
  const app = createApp()

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

void main()
