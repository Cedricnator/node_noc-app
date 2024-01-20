import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{
    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/logs-all.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly hightLogsPath: string = 'logs/logs-hight.log';

    constructor(  ) {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if ( !fs.existsSync( this.logPath )){
            fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.hightLogsPath
        ].forEach( path => {
            if ( fs.existsSync( path )) return;
            fs.writeFileSync( path, '' );
        });

       
    }

    async saveLog( newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allLogsPath, `${ JSON.stringify(newLog)}\n`);
        if( newLog.level === LogSeverityLevel.LOW) return;

        if( newLog.level === LogSeverityLevel.MEDIUM){
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        }
        fs.appendFileSync( this.hightLogsPath, logAsJson);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}