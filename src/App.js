import { useState } from 'react';
import {
  createTheme,
  Container,
  MenuItem,
  TextField,
  ThemeProvider
} from '@material-ui/core';
import Header from './Components/Header';

function App() {
  const [language, setLanguage] = useState('en');
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [audio, setAudio] = useState('');

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#eee'
      },
      type: 'dark'
    }
  });
  const getWord = (e, incoming) => {
    e.preventDefault();
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + incoming;
    console.log('getting word');
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].meanings);
        setMeanings(data[0].meanings);
        // setAudio(data[0].phonetics[0].audio);
      });
  };

  const handleLanguageChange = (newLanguage) => {
    setWord('');
    setMeanings('');
    setAudio('');
    setLanguage(newLanguage);
  };

  return (
    <div className='App'>
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth='sm'>
          <Header />
          <main>
            <div className='inputs'>
              <TextField
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className='search'
              />
              <TextField
                className='select'
                select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <MenuItem value='en'>English</MenuItem>
                <MenuItem value='ja'>Japanese</MenuItem>
              </TextField>
            </div>
            <h2>Definition:</h2>
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
