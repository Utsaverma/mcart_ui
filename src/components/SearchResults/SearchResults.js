import { Link } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result, clearSearch }) => {

  return (
    <div className="search-result" onClick={clearSearch}>
      <Link to={`/product/${result.id}`}>{result.name}</Link>
    </div>
  );
};