import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, append as appendProducts, update as updateProducts} from '../reducers/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import ProductPage from '../ProductPage/ProductPage';
import { Filters } from '../Filters/filters';
import { getProductsByTitle, DEFAULT_START_INDEX, DEFAULT_SIZE, NUMBER_OF_ELEMENTS_AT_EACH_ROW, getProductsByCategory } from '../services/productServices';
import './ProductList.css';

const ProductList = ({source, category}) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const { value, key } = useParams();


  const [fullGroups, setFullGroups] = useState(0);
  const [remainder, setRemainder] = useState(0);
  const [abortController, setAbortController] = useState(null);
  const [startIndex, setStartIndex] = useState(DEFAULT_START_INDEX);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [filters, setFilters] = useState({
    gender: '',
    sort: ''
  });

  useEffect(()=>{
    if(source!=="category"){
      setProducts([]);
      loadProducts(true);
    }
  }, [value, filters]);

  useEffect(()=>{
    if(source ==="category" && category){
      console.log("inside")
      setProducts([]);
      loadProductsFromCategory(true);
    }
  }, [category])


  useEffect(()=>{
    console.log(products)
   setFullGroups(Math.floor(products.length / NUMBER_OF_ELEMENTS_AT_EACH_ROW));
   setRemainder(products.length % NUMBER_OF_ELEMENTS_AT_EACH_ROW);
  }, [products]);

  const loadProducts = async (init=false) =>{
    if(init===true){
      setStartIndex(DEFAULT_SIZE);
    }
    else{
      setStartIndex(prevStartIndex => prevStartIndex + DEFAULT_SIZE);
    }
    
    if(abortController) {
      abortController.abort();
    }
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    
    const data = await getProductsByTitle(value, newAbortController, startIndex, filters);
    if (data) {
      if(init===true){
        dispatch(updateProducts(data));
        setProducts(data);
      }
      else{
        dispatch(appendProducts(data));
        setProducts([...products, ...data.filter(item2 => !products.some(item1 => item1.asin === item2.asin))])
      }
      if(data.length < DEFAULT_SIZE){
        setShowLoadMore(false);
      }
    }
  }

  const loadProductsFromCategory = async(init=false) =>{
    if(init===true){
      setStartIndex(DEFAULT_SIZE);
    }
    else{
      setStartIndex(prevStartIndex => prevStartIndex + DEFAULT_SIZE);
    }
    const data = await getProductsByCategory(category, startIndex);
    if(data){
      if(init===true){
        dispatch(updateProducts(data));
        setProducts(data);
      }
      else{
        dispatch(appendProducts(data));
        setProducts([...products, ...data.filter(item2 => !products.some(item1 => item1.asin === item2.asin))])
      }
      if(data.length < DEFAULT_SIZE){
        setShowLoadMore(false);
      }
    }
  }

    return (
    <div className="product-list">
      {
        products.length > 0  && <>
          {source !== "category" ?<Filters filters={filters} setFilters={setFilters}/>:null}
          <div className="productsListContainer">
          {[...Array(fullGroups)].map((_, groupIndex) => (
            <Row key={groupIndex}>
              {[...Array(NUMBER_OF_ELEMENTS_AT_EACH_ROW)].map((_, innerIndex) => (
                <Col key={groupIndex * NUMBER_OF_ELEMENTS_AT_EACH_ROW + innerIndex}>
                  <ProductPage  asin={products[groupIndex * NUMBER_OF_ELEMENTS_AT_EACH_ROW + innerIndex]['asin']}/>
                </Col>
              ))}
            </Row>
          ))}
          {remainder > 0 && (
            <Row>
              {[...Array(remainder)].map((_, remainderIndex) => (
                <Col key={fullGroups * 3 + remainderIndex}>
                  <ProductPage asin={products[fullGroups * 3 + remainderIndex]['asin']} />
                </Col>
              ))}
              {[...Array(NUMBER_OF_ELEMENTS_AT_EACH_ROW - remainder)].map((_, remainderIndex) => (
                <Col></Col>
              ))}
            </Row>
          )}
        </div>
        {showLoadMore && <Button variant="primary" onClick={source !== "category" ? loadProducts : loadProductsFromCategory}> Load More </Button>}
      </>
    }
      
    </div>
  );
}

export default ProductList;
