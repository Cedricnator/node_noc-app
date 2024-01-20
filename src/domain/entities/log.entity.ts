export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HEIGH = 'HEIGH',
}

export interface LogEntityOptions {
    level: LogSeverityLevel; // enum
    message: string;
    origin: string;
    createdAt?: Date;
}


export class LogEntity {
    public level: LogSeverityLevel; // enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options:LogEntityOptions ){
        const { message, level, origin, createdAt = new Date} = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = ( json: string ):LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);
        if( !message ) throw new Error( 'message is required' );
        if( !level ) throw new Error( 'level is required' );
        if( !createdAt ) throw new Error( 'createdAt is required' );
        if( !origin ) throw new Error( 'origin is required' );

        const log = new LogEntity({
            message: message,
            level: level, 
            createdAt: createdAt,
            origin: origin
        });
        
        return log;
        
    }

}