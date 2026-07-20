function getAuthorBookStatistics(authorId, books) {
    const authorBooks = books.filter(book => book.authorId === authorId);

    const totalBooks = authorBooks.length;

    const averageRating =
        totalBooks === 0
            ? 0
            : authorBooks.reduce((sum, book) => sum + book.rating, 0) / totalBooks;

    const highestRatedBook =
        totalBooks === 0
            ? null
            : authorBooks.reduce((highest, book) =>
                book.rating > highest.rating ? book : highest
            );

    return {
        books: authorBooks,
        totalBooks,
        averageRating,
        highestRatedBook
    };
}

describe("getAuthorBookStatistics", () => {

    test("should return correct statistics for an author", () => {

        const mockBooks = [
            { id: 1, title: "Book A", authorId: 1, rating: 4.5 },
            { id: 2, title: "Book B", authorId: 1, rating: 3.8 },
            { id: 3, title: "Book C", authorId: 2, rating: 4.2 },
            { id: 4, title: "Book D", authorId: 1, rating: 4.9 }
        ];

        const result = getAuthorBookStatistics(1, mockBooks);

        expect(result.totalBooks).toBe(3);
        expect(result.averageRating).toBeCloseTo(4.4, 1);
        expect(result.highestRatedBook.title).toBe("Book D");
        expect(result.books.length).toBe(3);

    });

});