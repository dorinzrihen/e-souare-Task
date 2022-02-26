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

  const handleSearch = () => updateSearchInput(inputValue);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const onKeyDown = (e) => e.keyCode === 13 && handleSearch();

  return (
    <div className='header'>
      <h1>Book search</h1>
      <div className='header-search'>
        <input placeholder='Search for book name' value={inputValue} onChange={handleInputChange} onKeyDown={onKeyDown}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

const BookCards = ({value}) => {
  const { booksData, isLoading } = useBooksSearch(value);

  const isEmpty = !isLoading && !booksData?.length && value;
  const noBookMsg = 'No results found';
  const noImage = 'https://www.finisswim.com/sca-dev-2021-1-0/extensions/SuiteCommerce/Finis_custom_20/20.1.4/img/no_image_available.jpeg'

  const cards = useMemo(
    () => booksData?.map((book, index) => {
      const { title, imageLinks, description } = book.volumeInfo;
      const { thumbnail, smallThumbnail } = imageLinks ?? {};
      return <Card key={`${title}-${index}`} title={title} src={thumbnail || smallThumbnail || noImage} description={description}/>
  }) ,[booksData])

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
      <h4 dir="auto">{title}</h4>
      <div className='content'>
        <p dir="auto">{description}</p>
      </div>
    </div>
  );
};

export default App;
