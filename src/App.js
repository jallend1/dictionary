import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

function App() {
  const [word, setWord] = useState('hello');
  const getWord = (incoming) => {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + incoming;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWord(data[0].word));
  };

  useEffect(() => getWord('howdy'), []);
  return (
    <div className='App'>
      <header>
        <TextField />
      </header>
      <main>{word} there</main>
    </div>
  );
}

export default App;
