import { useState, useMemo } from 'react';
import useBooksSearch from './useBooksSearch';

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
  const { booksData, isLoading } = useBooksSearch(value)

  const cards = useMemo(() => booksData?.map(book => console.log("here",book)) ,[booksData])

  return (
    <></>
  )
}

const Card = ({}) => {
  
}

export default App;
