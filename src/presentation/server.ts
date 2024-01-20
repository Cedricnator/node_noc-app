import { CronService } from "./cron/cron.service"

export class Server {
    public static start() {
        console.log('Server started...')
        CronService.createJob(
            '* * * * * *',
            () => {
                const date = new Date();
                console.log('You will see this message every second', date.toLocaleTimeString('es-CL'))
            }
        );

        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const date = new Date();
                console.log('You will see this message every 2 seconds', date.toLocaleTimeString('es-CL'))
            }
        );

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                const date = new Date();
                console.log('You will see this message every 3 seconds', date.toLocaleTimeString('es-CL'))
            }
        );

    }

}