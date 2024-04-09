import { LogModel } from "../../data/mongoDB";
import { LogDataSource } from "../../domain/datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";

export class MongoLogDataSource implements LogDataSource {
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        //await newLog.save();
        console.log('Mongo Log created: ', newLog.id );
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })

        return logs.map( mongoLog => LogEntity.fromObject(mongoLog));
    }

}