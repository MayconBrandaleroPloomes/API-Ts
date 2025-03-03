import AuthorModel from "../models/author";

class AuthorController {
    private authors: AuthorModel[] = [];
    private nextId: number = 1;

    createAuthor(name: string, age: number, books: string[], nacionality: string, observations?: string): AuthorModel {
        const id = this.nextId +1;
        const newAuthor = new AuthorModel(id, name, age, books, nacionality, observations);
        this.authors.push(newAuthor);
        return newAuthor;
    };

    getAuthors(): AuthorModel[] {
        return this.authors;
    };

    getAuthorById(id: number): AuthorModel | undefined {
        return this.authors.find(author => author.id === id);
    };

    updateAuthor(id: number, newName: string, newAge: number, newBooks: string[], newNacionality: string, newObservations?: string): AuthorModel | undefined {
        const author = this.getAuthorById(id);
        if (!author) return undefined;

        author.name = newName;
        author.age = newAge;
        author.books = newBooks;
        author.nacionality = newNacionality;
        author.observations = newObservations;

        return author;
    };

    deleteAuthor(id: number): boolean {
        const author = this.getAuthorById(id);
        if (!author) return false;

        const index = this.authors.indexOf(author);
        if (index > -1) {
            this.authors.splice(index, 1);
            return true;
        };

        return false;
    };

};

export default new AuthorController();
