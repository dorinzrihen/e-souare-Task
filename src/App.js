import { useState, useMemo } from 'react';
import useBooksSearch from './useBooksSearch';
import './App.css';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const updateSearchInput = (value) => setSearchInput(value);

  return (
    <div className="App">
      <Header updateSearchInput={updateSearchInput} />
      <BookCards value={searchInput} />
    </div>
  );
}

const Header = ({updateSearchInput}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSearch = () => updateSearchInput(inputValue);

  return (
    <div className='header'>
      <h1>Book search</h1>
      <div className='header-search'>
        <input placeholder='Search for book name' value={inputValue} onChange={handleInputChange}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

const BookCards = ({value}) => {
  const { booksData, isLoading } = useBooksSearch(value);

  const isEmpty = !isLoading && !booksData?.length && value;
  const noBookMsg = 'No results found';

  console.log(booksData);
  const cards = useMemo(() => booksData?.map(book => <Card key={book?.volumeInfo?.title} title={book?.volumeInfo?.title} src={book?.volumeInfo?.imageLinks.smallThumbnail} description={book?.volumeInfo?.description}/>) ,[booksData])

  return (
    <div className='cards-container'>
      {isLoading 
        ? <div className='loader'></div> 
        : isEmpty ? <p>{noBookMsg}</p> : cards
      }
    </div>
  );
};

const Card = ({title, description, src}) => {
  return (
    <div className='card'>
      <div className='card-src'>
        <img src={src} alt='book img'/>
      </div>
      <div className='content'>
        <h4 dir="auto">{title}</h4>
        <p dir="auto">{description}</p>
      </div>
    </div>
  );
};

export default App;
