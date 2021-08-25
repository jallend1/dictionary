const Definitions = ({ word, meanings }) => {
  if (word.length > 0 && meanings.length === 0) {
    return <h3>"{word}" wasn't found in the dictionary.</h3>;
  } else {
    return (
      <div>
        {meanings.map((meaning) => (
          <div key={meaning.partOfSpeech}>
            <h3> Part of Speech: {meaning.partOfSpeech}</h3>
            <p>{meaning.definitions[0].definition}</p>
          </div>
        ))}
      </div>
    );
  }
};

export default Definitions;
