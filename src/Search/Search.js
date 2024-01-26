import React, { useState, useEffect } from 'react';
import { SearchResultsList } from '../SearchResultsList/SearchResultsList';
import { useDispatch } from 'react-redux';
import { update as ProductUpdate } from '../reducers/productsSlice';

export const Search = () =>{
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownResults, setDropDownResults] = useState([]);
    // const [searchData, setSearchData] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [abortController, setAbortController] = useState(null);

    useEffect(() => {
      return () => {
        if (abortController) {
          abortController.abort();
        }
      };
    }, [abortController]);
  
    const fetchTitles = (value) => {
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      fetch(`http://localhost:5000/search?key=${value}`, {
        signal: newAbortController.signal,
      })
      .then((response)=>response.json())
      .then((data)=>{
        dispatch(ProductUpdate(data));
        setDropDownResults(data.map(({ asin: id, title: name }) => ({ id, name })));
      })
      .catch((error)=>{
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setAbortController(null);
      });
    }

    const handleSearchChange = (value) => {
      setSearchQuery(value);
      if (abortController) {
        abortController.abort();
      }
      fetchTitles(value);
      setShowModal(true);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); 
        console.log('Searching for:', searchQuery);
    };

    return(
        <div className="search-page">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {dropdownResults && dropdownResults.length > 0 && showModal &&<SearchResultsList results={dropdownResults} setShowModal={setShowModal} setSearchQuery={setSearchQuery}/>}
        </div>
    )
}