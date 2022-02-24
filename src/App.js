import { useState } from 'react';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const updateSearchInput = (value) => setSearchInput(value);

  return (
    <div className="App">
      <Search updateSearchInput={updateSearchInput} />
      <BookCards value={searchInput} />
    </div>
  );
}

const Search = ({updateSearchInput}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSearch = () => updateSearchInput(inputValue);

  return (
    <>
      <input value={inputValue} onChange={handleInputChange}></input>
      <button onClick={handleSearch}>Search</button>
    </>
  )
}

const BookCards = ({value}) => {
  const { booksData } = useBooksSearch(value)
}

export default App;
