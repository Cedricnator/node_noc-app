import { Server } from "./presentation/server";
import 'dotenv/config'

// Funcion anonima autoinvocada, debe esperar a que se ejecute el main
(async () => {
    main();
})();

function main() {
    // Server.start();
    console.log(process.env.PORT)
}