import "./SearchResultsList.css";
import { SearchResult } from "../SearchResults/SearchResults";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchResultsList = ({ results, setShowModal, setSearchQuery }) => {

  const clearSearch = () => {
    setShowModal(false);
    setSearchQuery('');
  }

  return (
    <div className="results-list">
      <FontAwesomeIcon icon={faClose} className="closeSearchResults" onClick={clearSearch} />
      {results.map((result, id) => {
        return result.id ? <SearchResult result={result} key={id} clearSearch={clearSearch} /> : <div>{result.name}</div>;
      })}
    </div>
  );
};