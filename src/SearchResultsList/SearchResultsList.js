import "./SearchResultsList.css";
import { SearchResult } from "../SearchResults/SearchResults";

export const SearchResultsList = ({ results, setShowModal, setSearchQuery }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return result.id ? <SearchResult result={result} key={id} setShowModal={setShowModal} setSearchQuery={setSearchQuery}/>: <div>{result.name}</div>;
      })}
    </div>
  );
};