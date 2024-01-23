import React, { useState } from 'react';
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
  
    const fetchTitles = (value) => {
      fetch(`http://localhost:5000/search?key=${value}`)
      .then((response)=>response.json())
      .then((data)=>{
        // setSearchData(data);
        dispatch(ProductUpdate(data));
        setDropDownResults(data.map(({ asin: id, title: name }) => ({ id, name })));
      })
      .catch((error)=>{
        setError(error);
      })
      
    }

    const handleSearchChange = (value) => {
      setSearchQuery(value);
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
            {dropdownResults && dropdownResults.length > 0 && showModal &&<SearchResultsList results={dropdownResults} setShowModal={setShowModal}/>}
        </div>
    )
}