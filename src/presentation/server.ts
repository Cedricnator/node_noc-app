import { CronService } from "./cron/cron.service"
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../intrastructure/datasources/file-system.datasource";
import { EmailService } from "../domain/use-cases/email/email.service";
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // new mongoLogDS(),
    // new PostgreSQL()
);

export class Server {
    public static start() {
        console.log('Server started...')
        const emailService = new EmailService()
        emailService.sendEmail({
            to: 'cedric.kirmayr@gmail.com',
            subject: 'Logs de sistema',
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Lorem vilit non veniam</p>
                <p>Ver logs adjuntos</p>
            `
        })

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = `http://localhost:3000`; 
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.error(error),
                
        //         ).execute( url );
        //     }
        // );

    }

}