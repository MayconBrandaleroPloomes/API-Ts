import { IncomingMessage, ServerResponse } from "http";
import { authorRoutes } from "./authorRoutes";
import { bookRoutes } from "./bookRoutes";

export const routes = (req: IncomingMessage, res: ServerResponse): void => {
    authorRoutes(req, res);
    bookRoutes(req, res);
};
