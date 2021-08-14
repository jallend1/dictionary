import { useState } from 'react';
import {
  createTheme,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].meanings);
        setMeanings(data[0].meanings);
        // setAudio(data[0].phonetics[0].audio);
      });
  };

  return (
    <div className='App'>
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth='sm'>
          <Header />
          <main>
            <FormControl>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value='en'>English</MenuItem>
                <MenuItem value='ja'>Japanese</MenuItem>
              </Select>
            </FormControl>
            <div>
              <form onSubmit={(e) => getWord(e, word)}>
                <TextField
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              </form>
              <h2>Definition:</h2>
            </div>
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
