export const fetchBookByISBN = async (req, res) => {
  const { isbn } = req.params;

  try {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    const data = await response.json();
    const book = data[`ISBN:${isbn}`];

    if (!book) {
      return res.status(404).json({ message: 'Book not found from OpenLibrary API' });
    }

    const simplifiedBook = {
      title: book.title || 'N/A',
      authors: book.authors?.map(a => a.name).join(', ') || 'Unknown',
      publishDate: book.publish_date || 'Unknown',
      subjects: book.subjects?.map(s => s.name).join(', ') || 'N/A',
      coverImage: book.cover?.large || null,
    };

    res.json(simplifiedBook);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Failed to fetch book data' });
  }
};
