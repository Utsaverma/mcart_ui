import "./SearchResultsList.css";
import { SearchResult } from "../SearchResults/SearchResults";

export const SearchResultsList = ({ results, setShowModal, setSearchQuery }) => {
  return (
    <div className="results-list">
      {/* {results} */}
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} setShowModal={setShowModal} setSearchQuery={setSearchQuery}/>;
      })}
    </div>
  );
};