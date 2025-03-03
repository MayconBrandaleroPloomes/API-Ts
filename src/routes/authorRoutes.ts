import { IncomingMessage, ServerResponse } from "http";
import authorController from "../controllers/authorController";

export const authorRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const url = req.url;
    const method = req.method;

    switch (true) {

        case url === "/authors" && method === "POST":
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                const { name, age, books, nacionality, observations } = JSON.parse(body);
                const newAuthor = authorController.createAuthor(name, age, books, nacionality, observations);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({message: "Author created successfully: ", newAuthor}));
            });
            break;

        case url === "/authors" && method === "GET":
            const authors = authorController.getAuthors();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(authors));
            break;

        case url === "/authors" && method === "PUT":
            let bodyPut = "";
            req.on("data", chunk => {
                bodyPut += chunk.toString();
            });

            req.on("end", () => {
                const { id, name, age, books, nacionality, observations } = JSON.parse(bodyPut);
                const updatedAuthor = authorController.updateAuthor(id, name, age, books, nacionality, observations);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({message: "Author updated successfully: ", updatedAuthor}));
            });
            break;

        case url?.startsWith("/authors/") && method === "DELETE":
            if (url) {
                const idToDelete = parseInt(url.split("/")[2]);
                const deletedAuthor = authorController.deleteAuthor(idToDelete);
                if (deletedAuthor) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Author deleted successfully", author: deletedAuthor }));
                } else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Author not found" }));
                }
            } else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid URL" }));
            }
            break;

        case url?.startsWith("/authorsById/") && method === "GET":
            if (url) {
                const idToGet = parseInt(url.split("/")[3]);
                const author = authorController.getAuthorById(idToGet);
                if (author) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(author));
                } else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Author not found" }));
                }
            } else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid URL" }));
            }
            break;

        default:
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Route not found" }));
            break;
    }
};