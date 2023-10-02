import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { author, title, category, price } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        category,
        price
    });

    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .populate('author')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};
// Devuelve la lista de libros con solo id, category y autor
const readAllA = (req: Request, res: Response, next: NextFunction) => {
    let query = {}; // category: 'action' };
    let projection = {
        _id: 1,
        category: 1
    };
    return Book.find(query, projection)
        .populate('author')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ book, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getAuthorByTitle = (req: Request, res: Response, next: NextFunction) => {
    const title = req.params.title;

    return Book.findOne({ title })
        .then((book) => {
            if (book) {
                res.status(200).json({ author: book.author });
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const addPriceToBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId; // Obtener el ID del libro desde los parámetros de la solicitud
    const price = req.body.price; // Obtener el precio desde el cuerpo de la solicitud

    // Encuentra el libro por su ID y actualiza el atributo "precio"
    Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.price = price; // Asigna el precio al libro
                return book
                    .save()
                    .then((updatedBook) => res.status(200).json({ book: updatedBook }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

export default { createBook, readBook, readAll, readAllA, updateBook, deleteBook, getAuthorByTitle, addPriceToBook };
