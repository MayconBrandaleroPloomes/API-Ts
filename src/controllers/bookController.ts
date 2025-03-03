import BookModel from "../models/book";

class BookController {
    private books: BookModel[] = [];
    private nextId: number = 1;

    createBook(title: string, author: string, pages: number, genre: string, price: number, year: number): BookModel {
        const id = this.nextId +1;
        const newBook = new BookModel(id, title, author, pages, genre, price, year);
        this.books.push(newBook);
        return newBook;
    };

    getBooks(): BookModel[] {
        return this.books;
    };

    getBookById(id: number): BookModel | undefined {
        return this.books.find(book => book.id === id);
    };

    getBooksByAuthor(author: string): BookModel[] {
        return this.books.filter(book => book.author === author);
    };

    getBooksByGenre(genre: string): BookModel[] {
        return this.books.filter(book => book.genre === genre);
    };

    updateBook(id: number, newTitle: string, newAuthor: string, newPages: number, newGenre: string, newPrice: number, newYear: number): BookModel | undefined {
        const book = this.getBookById(id);
        if (!book) return undefined;

        book.title = newTitle;
        book.author = newAuthor;
        book.pages = newPages;
        book.genre = newGenre;
        book.price = newPrice;
        book.year = newYear;

        return book;
    };

    deleteBook(id: number): boolean {
        const book = this.getBookById(id);
        if (!book) return false;

        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
            return true;
        };

        return false;
    };
};

export default new BookController();
