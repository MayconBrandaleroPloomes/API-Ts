import BookModel from "../models/book";
import client from "../config/database";

class BookController {
    async createBook(title: string, author: string, pages: number, genre: string, price: number, year: number): Promise<BookModel> {
        const result = await client.query(
            'INSERT INTO books (title, author, pages, genre, price, year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, pages, genre, price, year]
        );
        return result.rows[0];
    }

    async getBooks(): Promise<BookModel[]> {
        const result = await client.query('SELECT * FROM books');
        return result.rows;
    }

    async getBookById(id: number): Promise<BookModel | undefined> {
        const result = await client.query('SELECT * FROM books WHERE id = $1', [id]);
        return result.rows[0];
    }

    async getBooksByAuthor(author: string): Promise<BookModel[]> {
        const result = await client.query('SELECT * FROM books WHERE author = $1', [author]);
        return result.rows;
    }

    async getBooksByGenre(genre: string): Promise<BookModel[]> {
        const result = await client.query('SELECT * FROM books WHERE genre = $1', [genre]);
        return result.rows;
    }

    async updateBook(id: number, newTitle: string, newAuthor: string, newPages: number, newGenre: string, newPrice: number, newYear: number): Promise<BookModel | undefined> {
        const result = await client.query(
            'UPDATE books SET title = $1, author = $2, pages = $3, genre = $4, price = $5, year = $6 WHERE id = $7 RETURNING *',
            [newTitle, newAuthor, newPages, newGenre, newPrice, newYear, id]
        );
        return result.rows[0];
    }

    async deleteBook(id: number): Promise<boolean> {
        const result = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default new BookController();
