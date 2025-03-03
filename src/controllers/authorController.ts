import AuthorModel from "../models/author";
import client from "../config/database";

class AuthorController {
    async createAuthor(name: string, age: number, books: string[], nationality: string, observations?: string): Promise<AuthorModel> {
        const result = await client.query(
            'INSERT INTO authors (name, age, books, nationality, observations) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, age, books, nationality, observations]
        );
        return result.rows[0];
    }

    async getAuthors(): Promise<AuthorModel[]> {
        const result = await client.query('SELECT * FROM authors');
        return result.rows;
    }

    async getAuthorById(id: number): Promise<AuthorModel | undefined> {
        const result = await client.query('SELECT * FROM authors WHERE id = $1', [id]);
        return result.rows[0];
    }

    async updateAuthor(id: number, newName: string, newAge: number, newBooks: string[], newNationality: string, newObservations?: string): Promise<AuthorModel | undefined> {
        const result = await client.query(
            'UPDATE authors SET name = $1, age = $2, books = $3, nationality = $4, observations = $5 WHERE id = $6 RETURNING *',
            [newName, newAge, newBooks, newNationality, newObservations, id]
        );
        return result.rows[0];
    }

    async deleteAuthor(id: number): Promise<boolean> {
        const result = await client.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default new AuthorController();
