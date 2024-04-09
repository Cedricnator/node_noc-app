import { LogEntity, LogSeverityLevel } from "../../entities";
import { LogRepository } from "../../repository";

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
};

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ( (error: string ) => void) | undefined;


export class CheckServiceMultiples implements CheckServiceMultipleUseCase {
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    private callLogs( log: LogEntity ){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog( log );
        })
    }

    public async execute( url: string): Promise<boolean>{
        try {
            const req = await fetch( url );
            if( !req.ok ){
                throw new Error( `Error on check service ${ url }`);
            };

            const log = new LogEntity({
                message: `Service ${ url } working`,
                level: LogSeverityLevel.LOW,
                origin: 'CheckServiceUseCase'
            })

            this.callLogs( log )
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            
            const entity = {
                message: `${url} is not ok. ${error }`,
                level: LogSeverityLevel.HIGH,
                origin: 'CheckServiceUseCase'
            }

            const errorMessage = `${url} is not ok. ${error }`;
            const log = new LogEntity(entity);
            this.callLogs( log );
            this.errorCallback && this.errorCallback( `${ errorMessage }`);
            return false;
        }
    }
}