import { LogRepositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../intrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";
import { CronService } from "./cron/cron.service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { Console, error } from "console";
import { MongoLogDataSource } from "../intrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";

const logRepository = new LogRepositoryImpl(
    //new FileSystemDataSource()
    new MongoLogDataSource(),
    // new PostgreSQL()
);

const emailService = new EmailService()

export class Server {
    public static async start() {
        console.log('Server started...');

        //* Se usa el caso de uso
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['cedric.kirmayr@gmail.com', 'c.kirmayr01@ufromail.cl']
        // )

        // const logs = await logRepository.getLogs(LogSeverityLevel.LOW );
        // console.log( logs )

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';

        //         new CheckService(
        //             logRepository,
        //             () => console.log( `${ url } is ok`),
        //             ( error ) => console.log( error ),
        //         ).execute( url )
        //     }
        // )

    }
}