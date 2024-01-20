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

    static fromJson = ( json: string ):LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        if( !message ) throw new Error( 'message is required' );
        if( !level ) throw new Error( 'level is required' );
        if( !createdAt ) throw new Error( 'createdAt is required' );
        const log = new LogEntity( message, level );
        log.createdAt = new Date( createdAt );
        return log;
        
    }

}