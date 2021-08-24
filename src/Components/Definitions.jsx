const Definitions = ({ word, meanings }) => {
  if (word.length > 0 && meanings.length === 0) {
    return <h3>That word wasn't found. :(</h3>;
  } else {
    return (
      <div>
        {meanings.map((meaning) => (
          <div>
            <h3> Part of Speech: {meaning.partOfSpeech}</h3>
            <p>{meaning.definitions[0].definition}</p>
          </div>
        ))}
      </div>
    );
  }
};

export default Definitions;
