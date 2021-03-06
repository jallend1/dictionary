import { useState, useEffect } from 'react';
import {
  createTheme,
  Container,
  MenuItem,
  TextField,
  ThemeProvider
} from '@material-ui/core';
import Header from './Components/Header';
import Definitions from './Components/Definitions';

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
  const getWord = () => {
    if (word !== '') {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`;
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(res.status);
          }
        })
        .then((data) => {
          data[0].meanings ? setMeanings(data[0].meanings) : setMeanings([]);
          data[0].phonetics[0].audio
            ? setAudio(data[0].phonetics[0].audio)
            : setAudio('');
        })
        .catch((err) => {
          console.log(err);
          setMeanings([]);
          setAudio('');
        });
    } else {
      setMeanings([]);
      setAudio('');
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setWord('');
    setMeanings('');
    setAudio('');
    setLanguage(newLanguage);
  };

  useEffect(getWord, [word, language]);

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
            {audio !== '' ? (
              <div>
                <audio src={audio} controls></audio>
              </div>
            ) : null}
            {meanings && <Definitions word={word} meanings={meanings} />}
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
