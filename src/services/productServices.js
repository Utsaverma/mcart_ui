const BASE_URL = 'http://localhost:5000';

export const DEFAULT_START_INDEX = 0
export const DEFAULT_SIZE = 30

export const getProductById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/searchById?id=${id}`);
      const data = await response.json();
      return data;
    } 
    catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error; // Propagate the error for the calling component to handle
    }
};

export const getProductsByTitle = async (value, abortController, startIndex=DEFAULT_START_INDEX) => {
    if(value){
        try {
            const response = await fetch(`${BASE_URL}/search?key=${value}&size=${DEFAULT_SIZE}&start=${startIndex}`, {
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
    else 
        return null;
    
  };