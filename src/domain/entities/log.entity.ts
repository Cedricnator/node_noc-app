export enum LogSeverityLevel {
    HIGH  = 'HIGH',
    LOW    = 'LOW',
    MEDIUM = 'MEDIUM',
}

export interface LogEntityOptions {
    createdAt?: Date;
    level:      LogSeverityLevel; // enum
    message:    string;
    origin:     string;
}

export class LogEntity {
    public createdAt: Date;
    public level:     LogSeverityLevel; // enum
    public message:   string;
    public origin:    string;

    constructor( options:LogEntityOptions ){
        const { message, level, origin, createdAt = new Date} = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = ( json: string ):LogEntity => {

        json = ( json === '') ? '{}' : json;

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

    static fromObject = ( object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        
        const log = new LogEntity({
            message, level, createdAt, origin
        })

        return log;
    }
}