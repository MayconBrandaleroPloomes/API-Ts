import { IncomingMessage, ServerResponse } from 'http';
import bookController from '../controllers/bookController';

export const bookRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const url = req.url;
    const method = req.method;

    switch (true) {

        case url === '/books' && method === 'POST':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { title, author, pages, genre, price, year } = JSON.parse(body);
                const newBook = bookController.createBook(title, author, pages, genre, price, year);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book created successfully: ', newBook }));
            });
            break;

        case url === '/books' && method === 'GET':
            const books = bookController.getBooks();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(books));
            break;

        case url === '/books' && method === 'PUT':
            let bodyPut = '';
            req.on('data', chunk => {
                bodyPut += chunk.toString();
            });
            req.on('end', () => {
                const { id, title, author, pages, genre, price, year } = JSON.parse(bodyPut);
                const updatedBook = bookController.updateBook(id, title, author, pages, genre, price, year);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book updated successfully: ', updatedBook }));
            });
            break;

        case url?.startsWith('/books/') && method === 'DELETE':
            if (url) {
                const idToDelete = parseInt(url.split('/')[3]);
                const deletedBook = bookController.deleteBook(idToDelete);
                if (deletedBook) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Book deleted successfully', book: deletedBook }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Book not found' }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid URL' }));
            };
            break;

        case url?.startsWith('/booksById/') && method === 'GET':
            if (url) {
                const idToFind = parseInt(url.split('/')[3]);
                const book = bookController.getBookById(idToFind);
                if (book) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(book));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Book not found' }));
                }
            };
            break;

        case url?.startsWith('/booksByAuthor/') && method === 'GET':
            if (url) {
                const authorToFind = url.split('/')[3];
                const books = bookController.getBooksByAuthor(authorToFind);
                if (books) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(books));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Books not found' }));
                }
            };
            break;

        case url?.startsWith('/booksByGenre/') && method === 'GET':
            if (url) {
                const genreToFind = url.split('/')[3];
                const books = bookController.getBooksByGenre(genreToFind);
                if (books) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(books));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Books not found' }));
                }
            };
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
            break;
    };
};
