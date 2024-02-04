import { MOCKED_DATA } from "./mocked_data";
import { MOCK } from "./config";

const BASE_URL = 'http://localhost:5000';

export const NUMBER_OF_ELEMENTS_AT_EACH_ROW = 3;

export const DEFAULT_START_INDEX = 0
export const DEFAULT_SIZE = 30

export const getProductById = async (id) => {
    if(MOCK){
        return MOCKED_DATA[3];
    }
    else{
        if(id){
            try {
                const response = await fetch(`${BASE_URL}/searchById?id=${id}`);
                const data = await response.json();
                return data;
            } 
            catch (error) {
                console.error('Error fetching product by ID:', error);
                throw error;
            }
        } 
    }
    
};

export const getProductsByTitle = async (value, abortController, startIndex=DEFAULT_START_INDEX, filters={}) => {
    if (MOCK){
        return MOCKED_DATA
    }
    else{
        if(value){
            try {
                const response = await fetch(`${BASE_URL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        key: value,
                        size: DEFAULT_SIZE,
                        start: startIndex,
                        filters: filters
                    }),
                    signal: abortController.signal,
                });
    
            
                const data = await response.json();
                return data;
            } 
            catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching data:', error);
                }
                return null;
            }
        }
        else{
            return null; 
        }   
    }
     
};

export const getCategories = () => {
    // if(MOCK){
        const data = [
            "Men|Accessories|Boys' Watches",
            "Men|Accessories|Men's Accessories",
            "Men|Accessories|Men's Shoes",
            "Men|Clothing|Boys' Clothing",
            "Men|Clothing|Men's Clothing",
            "Women|Accessories|Foot, Hand & Nail Care Products",
            "Women|Accessories|Girls' Jewelry",
            "Women|Accessories|Girls' School Uniforms",
            "Women|Accessories|Girls' Shoes",
            "Women|Accessories|Girls' Watches",
            "Women|Accessories|Women's Handbags",
            "Women|Clothing|Baby Girls' Clothing & Shoes",
            "Women|Clothing|Girls' Clothing"
          ];
          
          const jsonData = data.map(entry => {
            const [gender, category, subCategory] = entry.split('|');
            return { gender, category, subCategory};
          });
          return jsonData
    // }
    // else{
    //     try {
    //         const response = await fetch(`${BASE_URL}/getAllCategories`);
    //         const data = await response.json();
    //         return data;
    //       } 
    //       catch (error) {
    //         console.error('Error fetching product by ID:', error);
    //         throw error; // Propagate the error for the calling component to handle
    //       }
    // }
}

export const getProductsByCategory = async (value,  startIndex=DEFAULT_START_INDEX, size=DEFAULT_SIZE) => { 
    if(MOCK){
        return MOCKED_DATA
    }
    else{
        if(value){
            try {
                const response = await fetch(`${BASE_URL}/searchByCategory?category=${value}&size=${size}&start=${startIndex}`);
                const data = await response.json();
                return data;
              } 
              catch (error) {
                console.error('Error fetching product by ID:', error);
                throw error; // Propagate the error for the calling component to handle
            }
        }  
    }
    
};

export const getItemsonSale = async() =>{
    if(MOCK){
        return MOCKED_DATA;
    }
    else{
        // call api
        return MOCKED_DATA;
    }
}

export const getItemsfeatured = async() =>{
    if(MOCK){
        return MOCKED_DATA;
    }
    else{
        // call api
        return MOCKED_DATA;
    }
}