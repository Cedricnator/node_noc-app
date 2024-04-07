/* 
- Aplicación NOC
- Proposito: Aprender a diseñar y crear una aplicacion de logs con correos electronicos. + arquitecura hexagonal.
- Autor: Cedric Kirmayr Pérez, Estudiante de ingenieria informatica.
- Descripción: Aplicación de monitoreo, con la capacidad de enviar correos electronicos con el log adjunto.
- Arquitectura: Arquitectura por capas, arquitectura hexagonal.
*/

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongoDB";
import { Server } from "./presentation/server";


// Funcion anonima autoinvocada, debe esperar a que se ejecute el main
(async () => {
    main();
})();

async function main() {
    
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'LOW',
    //         message: 'Test messae',
    //         origin: 'App.ts'
    //     }
    // })
    
    // console.log(newLog)
   
    Server.start();
}