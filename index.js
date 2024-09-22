const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET: Retrieve all books
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Books retrieved successfully',
        data: books
    });
});

// GET: Retrieve a book by id
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.status(200).json({
            message: 'Book retrieved successfully',
            data: book
        });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// POST: Create a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json({
        message: 'Book created successfully',
        data: newBook
    });
});

// PUT: Update a book by id
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books[bookIndex].title = req.body.title;
        books[bookIndex].author = reputq.body.author;
        res.status(200).json({
            message: 'Book updated successfully',
            data: books[bookIndex]
        });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});
// DELETE: Remove a book by id
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
