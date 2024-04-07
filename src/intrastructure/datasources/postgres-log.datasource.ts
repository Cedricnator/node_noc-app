import { PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

export class PostgresLogDataSource implements LogDataSource {
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({ data: log })
        console.log('Postgres Log created: ', newLog );    
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logFound = await prismaClient.logModel.findMany({
            where: {
                level: severityLevel
            }
        })
        console.log('Postgres Log found: ', logFound );
        return logFound.map( log => LogEntity.fromObject(log));
    }

}