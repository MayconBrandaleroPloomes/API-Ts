import { createServer, IncomingMessage, ServerResponse } from "http";
import { routes } from "./src/routes";
import dotenv from "dotenv";
import client from "./src/config/database";

dotenv.config();

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routes(req, res);
});

const PORT = 3000;

const startServer = async () => {
    try {
        await client.connect();
        console.log('Connected to the database');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
