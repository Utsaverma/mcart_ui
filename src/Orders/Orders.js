import { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getOrderByUserId } from "../services/orderService";
import "./Orders.css"
import { useDispatch } from "react-redux";
import { loadOrders } from "../reducers/ordersSlice";

const Orders = () =>{
    const currentUser = 'user123';
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        getOrders(currentUser);
    },[])

    const getOrders = async (userId) => {
        const data = await getOrderByUserId(userId);
        if(data){
            setOrders(data);
            dispatch(loadOrders(data))
        }
    }
    

    return (
        <div className="OrdersComponent minHeight">
            {
            orders.length && orders.map((order, index) => (
                <OrderDetails key={index} order={order}/>
            ))
            }
        </div>
        
    );
}

export default Orders;