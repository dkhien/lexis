import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from 'firebase/firestore';
import Book from './Book';
import useDocumentStore from '../../store/documentStore';
import { State, LexisDocumentType } from '../../constants';
import db from '../../firebase';

function SearchBar({ allBooks, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    setSearchResults(
      allBooks.filter(
        (book) => book.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <TextField
      fullWidth
      id="search-bar"
      placeholder="Search Books"
      variant="standard"
      type="text"
      autoComplete="off"
      value={searchTerm}
      onBlur={handleSearch}
      onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      sx={{ marginBottom: '2rem' }}
    />
  );
}

function BookList({ closeModal }) {
  const [searchResults, setSearchResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const addDocument = useDocumentStore((state) => state.addDocument);

  useEffect(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksData = querySnapshot.docs.map((doc) => doc.data());
      setAllBooks(booksData);
      setSearchResults(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, []);

  const handleAddDocument = (name, description) => {
    addDocument({
      id: uuidv4(),
      state: State.READY,
      type: LexisDocumentType.BOOK,
      file: null,
      name,
      description,
      content: ['1', '2', '3'],
    });
    closeModal();
  };

  // TODO: Replace image with actual book cover image
  return (
    <>
      <SearchBar allBooks={allBooks} setSearchResults={setSearchResults} />
      <Grid container spacing={4} maxHeight="100%" overflow="auto" paddingX="2rem" paddingBottom="2rem">
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={2} key={book.name}>
            <Book
              name={book.name}
              image="https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg"
              description={{
                Author: book.author,
                Year: book.year,
                Category: book.categories.map((category, index) => {
                  const separator = index === book.categories.length - 1 ? '' : ', ';
                  return `${category}${separator}`;
                }),
              }}
              handleAddBook={() => handleAddDocument(book.name, [book.author])}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

SearchBar.propTypes = {
  allBooks: PropTypes.arrayOf(Object).isRequired,
  setSearchResults: PropTypes.func.isRequired,
};

BookList.propTypes = {
  closeModal: PropTypes.func,
};

BookList.defaultProps = {
  closeModal: () => {},
};

export default BookList;
