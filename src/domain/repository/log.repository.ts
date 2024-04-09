import { LogEntity, LogSeverityLevel } from "../entities";

// Permite llamar métodos que se encuentran en dataSource
export abstract class LogRepository {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

