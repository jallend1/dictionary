import { useEffect, useState } from 'react';

function App() {
  const [word, setWord] = useState('hello');
  const getWord = (incoming) => {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + incoming
    fetch(url).then(res => res.json()).then((data) =>setWord(data[0].word));
  }

  useEffect(() => getWord('howdy'), [])
  return (
    <div className="App">
      {word} there
    </div>
  );
}

export default App;
