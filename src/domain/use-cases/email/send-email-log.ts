//! USUALMENTE SON NUESTROS CASOS DE USO LOS QUE LLAMAN AL REPOSITORIO

import { EmailService } from "../../../presentation/email";
import { LogEntity, LogSeverityLevel } from "../../entities";
import { LogRepository } from "../../repository";

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
                level: LogSeverityLevel.HIGH,
                origin: 'send-email-log.ts'
            })

            this.logRepository.saveLog( log );
            return false;
        }
    }
}