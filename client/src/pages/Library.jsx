import React, { useEffect, useState } from 'react';
import {
  Grid, FormControlLabel, Switch, Box, Card, Paper, InputBase, IconButton,
  CircularProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import BookItem from '../components/BookItem';
import db from '../firebase';
import VoiceSearch from '../components/VoiceSearch';

function Library() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const AI_SEARCH_API = `${process.env.REACT_APP_AI_SERVER_URL}`;

  const handleAdvancedSearch = async () => {
    if (searchQuery.trim() === '') setSearchResults(books);
    setLoading(true);
    const response = await axios.post(AI_SEARCH_API, { user_prompt: searchQuery });
    let ids = JSON.parse(response.data);
    ids = ids.map((id) => id[0]);
    setSearchResults(books.filter((book) => ids.includes(book.id)));
    setLoading(false);
  };

  const handleBasicSearch = () => {
    if (searchQuery.trim() === '') setSearchResults(books);
    const filteredBooks = books.filter((book) => {
      const bookName = book.name.toLowerCase();
      const bookAuthor = book.author.toLowerCase();
      const bookDescription = book.description.toLowerCase();
      const search = searchQuery.toLowerCase();
      return bookName.includes(search) || bookAuthor.includes(search)
        || bookDescription.includes(search);
    });
    setSearchResults(filteredBooks);
  };

  useEffect(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setBooks(booksData);
      setSearchResults(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (advancedSearch) {
      handleAdvancedSearch();
    } else {
      handleBasicSearch();
    }
  };

  useEffect(() => {
    if (!advancedSearch) {
      handleBasicSearch();
    }
  }, [searchQuery]);

  return (
    <>
      <Card sx={{ padding: '2rem', borderRadius: '1rem' }} variant="outlined">
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem',
        }}
        >
          <Paper
            component="form"
            sx={{
              p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%',
            }}
            variant="outlined"
            onSubmit={(e) => handleSearch(e)}
          >
            <VoiceSearch setSearchQuery={setSearchQuery} />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={advancedSearch ? 'Describe the book you\'re looking for' : 'Search books'}
              inputProps={{ 'aria-label': 'book search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <ArrowForwardIcon />
            </IconButton>
          </Paper>
        </Box>
        <FormControlLabel
          control={(
            <Switch
              checked={advancedSearch}
              onChange={() => setAdvancedSearch(!advancedSearch)}
            />
)}
          label="Advanced Search"
        />
      </Card>

      <Card sx={{ padding: '2rem', marginTop: '1rem', borderRadius: '1rem' }} variant="outlined">
        {loading && (
        <Box sx={{
          textAlign: 'center', padding: '1rem',
        }}
        >
          <CircularProgress />
        </Box>
        )}
        {searchResults.length === 0 && !loading && (
        <Box sx={{
          textAlign: 'center', color: 'gray', paddingBottom: '1rem',
        }}
        >
          No results found ☹️
        </Box>
        )}
        {searchResults.length > 0 && !loading && (
        <Grid container spacing={2}>
          {searchResults.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={book.id}>
              <BookItem
                name={book.name}
                image="https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg"
                author={book.author}
              />
            </Grid>
          ))}
        </Grid>
        )}
      </Card>
    </>
  );
}

export default Library;
