import { LogEntity, LogSeverityLevel } from "../entities";

// Implementamos la regla de negocio de nuestro dominio
export abstract class LogDataSource {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

