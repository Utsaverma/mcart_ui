import { useEffect, useState } from "react"
import { getProductsByCategory } from "../../services/productServices";
import ProductList from "../ProductList/ProductList";

export const CategorySearchList = ({gender, category,subCategory}) => {

    // const [data, setData] = useState([]);
    

    // useEffect(()=>{
    //     getAllProducts();
    // },[subCategory])

    // const getAllProducts = async()=>{
    //     const data = await getProductsByCategory(subCategory);
    //     if(data){
    //         setData(data)
    //     }
        
    // }

    return (
        <div>
            Showing Results for {gender} &gt; {category} &gt; {subCategory}
            <ProductList source="category" category={subCategory}/>
        </div>
    )
}