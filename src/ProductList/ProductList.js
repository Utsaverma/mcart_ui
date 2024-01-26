import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductList.css';

const DEFAULT_START_INDEX = 0
const DEFAULT_SIZE = 20

const ProductList = () => {

  const { value, key } = useParams();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [startIndex, setStartIndex] = useState(DEFAULT_START_INDEX);
  const [size, setSize] = useState(DEFAULT_SIZE);

  useEffect(()=>{
    console.log(value)
    fetch(`http://localhost:5000/search?key=${value}&start=${startIndex}&size=${size}`)
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data)
        setProducts(data)
      })
      .catch((error)=>{
        setError("Something went wrong")
      })
  }, [value, key])
  // You can simulate product data here or fetch it from an API
 

  return (
    <div className="product-list">
      <h2>Products</h2>
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ProductList;
