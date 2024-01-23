import { Link } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result, setShowModal }) => {
  return (
    // <div
    //   className="search-result"
    //   onClick={(e) => alert(`You selected ${result}!`)}
    // >
    //   {result}
    // </div>
    <div className="search-result" onClick={(e) => setShowModal(false)}>
      <Link to={`/product/${result.id}`}>{result.name}</Link>
    </div>
  );
};