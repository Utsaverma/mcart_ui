import React, { useState, useEffect } from 'react';
import { SearchResultsList } from '../SearchResultsList/SearchResultsList';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { update as ProductUpdate } from '../reducers/productsSlice';

export const Search = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownResults, setDropDownResults] = useState([]);
    // const [searchData, setSearchData] = useState([]);
    const [error, setError] = useState("");
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

    // useEffect(()=>{
    //   navigate(`/products/${searchQuery}`);
    // }, [reloadKey])
  
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
          setDropDownResults([{'id': null, 'name': 'Something went wrong'}]);
        }
      })
      .finally(() => {
        setAbortController(null);
      });
    }

    const handleSearchChange = (value) => {
      setSearchQuery(value);
      setReloadKey(0);
      if (abortController) {
        abortController.abort();
      }
      fetchTitles(value);
      setShowModal(true);
    };

    const handleSearchClick = () => {
        // event.preventDefault(); 
        setShowModal(false);
        setReloadKey((prevKey) => prevKey + 1);
        navigate(`/products/${searchQuery}/${reloadKey}`);
    };
    

    return(
        <div className="search-page">
            
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <button onClick={handleSearchClick}>
                  {/* <Link to={`/products/${searchQuery}`} key={reloadKey}> Search </Link> */}
                  Search
                  </button>
            {/* </form> */}
            {dropdownResults && dropdownResults.length > 0 && showModal &&<SearchResultsList results={dropdownResults} setShowModal={setShowModal} setSearchQuery={setSearchQuery}/>}
        </div>
    )
}