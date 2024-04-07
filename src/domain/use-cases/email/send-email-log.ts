//! USUALMENTE SON NUESTROS CASOS DE USO LOS QUE LLAMAN AL REPOSITORIO

import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: ( to:string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService, // se puede reemplazar por una funcion que haga referencia 
        private readonly logRepository: LogRepository
    ){}

    async execute( to: string | string[]){
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to); 

            if( !sent ){
                throw new Error('Email not sent');
            }
            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.HEIGH,
                origin: 'send-email-log.ts'
            })

            this.logRepository.saveLog( log );
            return false;
        }
    }
}