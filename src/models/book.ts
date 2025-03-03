interface Book {
    id: number;
    title: string;
    author: string;
    pages: number;
    genre: string;
    price: number;
    year?: number;
};

class BookModel implements Book {
    id: number;
    title: string;
    author: string;
    pages: number;
    genre: string;
    price: number;
    year?: number;

    constructor(id: number, title: string, author: string, pages: number, genre: string, price: number, year?: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.price = price;
        this.year = year;
    };
};

export default BookModel;
