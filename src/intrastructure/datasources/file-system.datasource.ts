import { LogDataSource } from "../../domain/datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";
import fs from 'fs';

export class FileSystemDataSource implements LogDataSource{
    private readonly logPath:        string = 'logs/';
    private readonly allLogsPath:    string = 'logs/logs-all.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly hightLogsPath:  string = 'logs/logs-hight.log';

    constructor() {
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

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8');
        if( content === '') return [];
        const logs = content.split(`\n`).map( 
            log => LogEntity.fromJson( log ) 
        )
        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch( severityLevel ){
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.hightLogsPath);
            default:
                throw new Error(`${ severityLevel } not implemented` );
        }
    }

}