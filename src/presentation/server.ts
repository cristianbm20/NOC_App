import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from './cron/cron-service'

export class Server {
  public static start (): void {
    console.log('Server started...')

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com'
        new CheckService(
          () => console.log(`${url} is ok`),
          error => console.log(`${String(error)}`)
        ).execute(url)
        // new CheckService().execute('http://localhost:3000')
          .catch(error => console.log(`${String(error)}`))
      }
    )
  }
}
