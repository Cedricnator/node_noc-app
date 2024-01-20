export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HEIGH = 'HEIGH',
}


export class LogEntity {
    public level: LogSeverityLevel; // enum
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

}