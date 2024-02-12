import React, { useState, useEffect } from 'react';
import { SearchResultsList } from '../SearchResultsList/SearchResultsList';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { update as ProductUpdate } from '../../reducers/productsSlice';
import { getProductsByTitle } from '../../services/productServices';
import { Button } from 'react-bootstrap';


export const Search = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownResults, setDropDownResults] = useState([]);

    const [showModal, setShowModal] = useState(true);
    const [abortController, setAbortController] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);


    useEffect(() => {
      return () => {
        if (abortController) {
          abortController.abort();
        }
      };
    }, [abortController]);

  
    const fetchTitles = async (value) => {
      if(abortController) {
        abortController.abort();
      }
  
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
  
      const data = await getProductsByTitle(value, newAbortController);
      
      if (data) {
        dispatch(ProductUpdate(data));
        setDropDownResults(data.map(({ asin: id, title: name }) => ({ id, name })));
      }
    }

    const handleSearchChange = (value) => {
      setSearchQuery(value);
      setReloadKey(0);
      if (abortController) {
        abortController.abort();
      }
      if(value){
        fetchTitles(value);
        setShowModal(true);
      }
      else{
        setShowModal(false);
      }
    };

    const handleSearchClick = () => {
        setShowModal(false);
        setReloadKey((prevKey) => prevKey + 1);
        navigate(`/products/${searchQuery}/${reloadKey}`);
    };

    const handleEnterKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearchClick();
      }
    };
    

    return(
        <div className="search-page">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                />
                { searchQuery ? 
                <Button variant="primary" onClick={handleSearchClick}>Search</Button> 
                : <Button variant="primary" disabled>Search</Button>}
            {dropdownResults && dropdownResults.length > 0 && showModal &&<SearchResultsList results={dropdownResults} setShowModal={setShowModal} setSearchQuery={setSearchQuery}/>}
        </div>
    )
}