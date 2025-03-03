interface Author{
    id: number;
    name: string;
    age: number;
    books: string[];
    nacionality: string;
    observations?: string;
};

class AuthorModel implements Author {
    id: number;
    name: string;
    age: number;
    books: string[];
    nacionality: string;
    observations?: string;

    constructor(id: number, name: string, age: number, books: string[], nacionality: string, observations?: string){
        this.id = id;
        this.name = name;
        this.age = age;
        this.books = books;
        this.nacionality = nacionality;
        this.observations = observations;
    };
};

export default AuthorModel;
