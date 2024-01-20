import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

// Funcion anonima autoinvocada, debe esperar a que se ejecute el main
(async () => {
    main();
})();

function main() {
    // Server.start();
    console.log( envs )
}