import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [audio, setAudio] = useState('');

  const getWord = (e, incoming) => {
    e.preventDefault();
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + incoming;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setDefinition(data[0].meanings[0].definitions[0].definition);
        setAudio(data[0].phonetics[0].audio);
      });
  };

  // useEffect(() => getWord('howdy'), []);
  return (
    <div className='App'>
      <header>
        <form onSubmit={(e) => getWord(e, word)}>
          <TextField value={word} onChange={(e) => setWord(e.target.value)} />
        </form>
      </header>
      <main>{word} there</main>
    </div>
  );
}

export default App;
