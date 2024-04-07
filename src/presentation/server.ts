import { LogRepositoryImpl } from "../intrastructure/repositories";
import { EmailService } from "./email";
import { CronService } from "./cron";
import { MongoLogDataSource, PostgresLogDataSource, FileSystemDataSource } from "../intrastructure/datasources";
import { CheckServiceMultiples } from "../domain/use-cases/checks";

// const logRepository = new LogRepositoryImpl(
//     //new FileSystemDataSource()
//     // new MongoLogDataSource(),
//     new PostgresLogDataSource()
// );

const PostgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDataSource()
);

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
)

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

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';

                new CheckServiceMultiples(
                    [ fsLogRepository, PostgresLogRepository, mongoLogRepository],
                    () => console.log( `${ url } is ok`),
                    ( error ) => console.log( error ),
                ).execute( url )
            }
        )

    }
}