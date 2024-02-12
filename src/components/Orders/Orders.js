import { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getOrderByUserId } from "../../services/orderService";
import "./Orders.css"
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../../reducers/ordersSlice";
import { getUser } from "../../reducers/userSlice";

const Orders = () =>{
    
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        getOrders(currentUser['userId']);
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