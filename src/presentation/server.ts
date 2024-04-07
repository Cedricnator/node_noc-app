import { LogRepositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../intrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // new mongoLogDS(),
    // new PostgreSQL()
);

const emailService = new EmailService()

export class Server {
    public static start() {
        console.log('Server started...');

        //* Se usa el caso de uso
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ['cedric.kirmayr@gmail.com', 'c.kirmayr01@ufromail.cl']
        )
    }
}