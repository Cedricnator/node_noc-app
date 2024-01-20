import { CronService } from "./cron/cron.service"
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../intrastructure/datasources/file-system.datasource";
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // new mongoLogDS(),
    // new PostgreSQL()
);

export class Server {
    public static start() {
        console.log('Server started...')
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = `http://localhost:3000`; 
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error),
                
                ).execute( url );
            }
        );

    }

}