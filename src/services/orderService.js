import { MOCKED_ORDERS } from "./mocked_data";
import { MOCK } from "./config";

const BASE_URL = 'http://localhost:5001/mcart/v1/orders';
// const BASE_URL = 'https://api.mcart.shop:444/mcart/v1/orders';

export const getOrderByUserId = async (userId) => {
    if (MOCK) {
        return MOCKED_ORDERS;
    }
    else {
        if (userId) {
            try {
                const response = await fetch(`${BASE_URL}/getOrderDetailsByUser?userId=${userId}`);
                const data = await response.json();
                return data;
            }
            catch (error) {
                console.error('Error fetching product by ID:', error);
                throw error;
            }
        }
    }
}
export const saveOrder = async (orderDetails) => {
    if (MOCK) {
        // return MOCKED_ORDERS;
    }
    else {
        const response = await fetch(`${BASE_URL}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });
        const data = await response.json();
        return data;
    }
}